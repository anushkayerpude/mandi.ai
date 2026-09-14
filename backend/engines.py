import math
from typing import List, Dict, Any
from .data import AHMEDABAD_WARDS_DATA, PRODUCE_CATALOG

def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    R = 6371.0
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (math.sin(dlat / 2) ** 2 +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2) ** 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return round(R * c, 1)

def compute_demand_score(ward: Dict[str, Any], category: str) -> int:
    pop_norm = min(100.0, (ward["population_density"] / 35000.0) * 100.0)
    res_part = ward["residential_density"] * 0.35
    pop_part = pop_norm * 0.25
    foot_part = ward["footfall_index"] * 0.40
    raw = res_part + pop_part + foot_part
    mod = 1.05 if category == "vegetables" and ward["residential_density"] > 90 else 0.98
    return min(99, max(40, round(raw * mod)))

def compute_stability_audit(ward_id: str) -> Dict[str, Any]:
    if ward_id in ["isanpur", "lambha"]:
        return {
            "overall_score": 88,
            "level": "HIGH",
            "vending_zone_status": "DESIGNATED_VENDING",
            "road_obstruction_risk": "LOW",
            "private_property_risk": "LOW",
            "competition_conflict_risk": "LOW",
            "known_restrictions": "AMC Designated Street Vending Corridor. Permitted 6 AM - 10 PM.",
            "municipal_compliance_percent": 95,
            "legal_disclaimer": "AI risk estimate based on municipal data. Does not guarantee legal immunity."
        }
    return {
        "overall_score": 72,
        "level": "MEDIUM",
        "vending_zone_status": "TIME_RESTRICTED",
        "road_obstruction_risk": "MEDIUM",
        "private_property_risk": "LOW",
        "competition_conflict_risk": "MEDIUM",
        "known_restrictions": "Traffic clearance required. Vending allowed only during off-peak hours.",
        "municipal_compliance_percent": 75,
        "legal_disclaimer": "AI risk estimate based on municipal data. Does not guarantee legal immunity."
    }

def optimize_produce_inventory(budget: float, category: str) -> List[Dict[str, Any]]:
    pool = PRODUCE_CATALOG if category == "mixed" else [p for p in PRODUCE_CATALOG if p["category"] == category or (category == "vegetables" and p["category"] == "leafy")]
    if not pool:
        pool = PRODUCE_CATALOG[:4]

    total_shares = sum(p["share"] for p in pool)
    results = []
    rem_budget = budget

    for idx, item in enumerate(pool):
        share = item["share"] / total_shares
        allocated = round((budget * share) / 50.0) * 50.0
        if idx == len(pool) - 1:
            allocated = rem_budget
        else:
            allocated = min(rem_budget - 50, allocated)
        allocated = max(50.0, allocated)
        rem_budget -= allocated

        estimated_kg = round((allocated / item["wholesale"]) * 10) / 10
        gross = estimated_kg * item["retail"]
        profit = round(gross - allocated)

        results.append({
            "id": item["id"],
            "name": item["name"],
            "name_gu": item["name_gu"],
            "name_hi": item["name_hi"],
            "icon": item["icon"],
            "category": item["category"],
            "allocated_amount": allocated,
            "estimated_kg": estimated_kg,
            "wholesale_price_per_kg": item["wholesale"],
            "retail_price_per_kg": item["retail"],
            "expected_profit": profit,
            "demand_level": "VERY_HIGH" if item["demand"] > 1.3 else "HIGH"
        })
    return results

def rank_locations_py(query_dict: Dict[str, Any]) -> List[Dict[str, Any]]:
    v_lat = query_dict.get("current_lat", 22.9920)
    v_lng = query_dict.get("current_lng", 72.5980)
    budget = query_dict.get("budget", 2000.0)
    cat = query_dict.get("category", "vegetables")

    recs = []
    for ward in AHMEDABAD_WARDS_DATA:
        dist = haversine_distance(v_lat, v_lng, ward["lat"], ward["lng"])
        eta = max(5, round((dist / 3.5) * 60))
        demand = compute_demand_score(ward, cat)
        stability = compute_stability_audit(ward["id"])

        # Competition proxy: Isanpur has 3, Maninagar 6, Lambha 2, etc.
        comp_count = 3 if ward["id"] == "isanpur" else 6 if ward["id"] == "maninagar" else 2
        comp_level = "LOW" if comp_count <= 3 else "MEDIUM"
        comp_score = 24 if comp_count <= 3 else 48

        # Opportunity Composite
        opp = round(0.35 * demand + 0.25 * stability["overall_score"] + 0.20 * max(30, 100 - dist * 10) - 0.15 * comp_score)
        opp = min(99, max(30, opp))

        inventory = optimize_produce_inventory(budget, cat)

        recs.append({
            "ward_id": ward["id"],
            "name": ward["name"],
            "name_gu": ward["name_gu"],
            "name_hi": ward["name_hi"],
            "zone": ward["zone"],
            "lat": ward["lat"],
            "lng": ward["lng"],
            "opportunity_score": opp,
            "demand_score": demand,
            "stability_score": stability["overall_score"],
            "competition_level": comp_level,
            "competition_vendor_count": comp_count,
            "distance_km": dist,
            "walking_eta_minutes": eta,
            "best_selling_window": ward["best_window"],
            "stability_audit": stability,
            "inventory": inventory
        })

    recs.sort(key=lambda x: x["opportunity_score"], reverse=True)
    return recs

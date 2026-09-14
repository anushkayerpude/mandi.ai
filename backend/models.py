from typing import List, Optional, Dict
from pydantic import BaseModel, Field

class VendorQueryRequest(BaseModel):
    budget: float = Field(default=2000.0, description="Working capital budget in INR")
    category: str = Field(default="vegetables", description="Commodity type: vegetables, fruits, leafy, mixed")
    max_distance_km: float = Field(default=5.0, description="Max acceptable handcart walking distance in km")
    duration_hours: float = Field(default=4.0, description="Planned vending duration in hours")
    current_lat: float = Field(default=22.9920, description="Vendor current latitude (depot/start point)")
    current_lng: float = Field(default=72.5980, description="Vendor current longitude")

class StabilityAuditResponse(BaseModel):
    overall_score: int
    level: str
    vending_zone_status: str
    road_obstruction_risk: str
    private_property_risk: str
    competition_conflict_risk: str
    known_restrictions: str
    municipal_compliance_percent: int
    legal_disclaimer: str

class RecommendedProduceItem(BaseModel):
    id: str
    name: str
    name_gu: str
    name_hi: str
    icon: str
    category: str
    allocated_amount: float
    estimated_kg: float
    wholesale_price_per_kg: float
    retail_price_per_kg: float
    expected_profit: float
    demand_level: str

class LocationRecommendationResponse(BaseModel):
    ward_id: str
    name: str
    name_gu: str
    name_hi: str
    zone: str
    lat: float
    lng: float
    opportunity_score: int
    demand_score: int
    stability_score: int
    competition_level: str
    competition_vendor_count: int
    distance_km: float
    walking_eta_minutes: int
    best_selling_window: str = "5:00 PM – 8:00 PM"
    stability_audit: StabilityAuditResponse
    inventory: List[RecommendedProduceItem]

class InventoryOptimizationRequest(BaseModel):
    budget: float = 2000.0
    category: str = "vegetables"
    ward_id: Optional[str] = "isanpur"

class DailySalesLogRequest(BaseModel):
    ward_id: str
    revenue: float
    budget_spent: float
    unsold_items: Dict[str, float]
    customers_count: int
    feedback: str

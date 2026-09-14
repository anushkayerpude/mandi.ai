import { Language, LocationRecommendation } from '../types';

/**
 * Web Speech API synthesizer for hands-free audio recommendations
 * designed for busy street vendors on Ahmedabad roads.
 */
export function speakRecommendation(
  rec: LocationRecommendation,
  lang: Language,
  onEnd?: () => void
): void {
  if (!('speechSynthesis' in window)) {
    alert('Voice synthesis not supported in this browser.');
    return;
  }

  window.speechSynthesis.cancel(); // Cancel any ongoing utterance

  let text = '';
  let speechLang = 'en-US';

  if (lang === 'gu') {
    speechLang = 'gu-IN';
    text = `આજની ભલામણ: સ્થળ ${rec.location.nameGu}. વેચાણ સમય સાંજે પાંચ થી આઠ વાગ્યા સુધી. તક સ્કોર ${rec.opportunityScore} છે. ગ્રાહક માંગ ઘણી વધારે છે અને હરીફાઈ ઓછી છે. સ્થિરતા સ્કોર ${rec.stabilityScore} છે. આજે ટામેટાં, બટાકા અને ડુંગળી રાખવાથી સારો નફો મળશે.`;
  } else if (lang === 'hi') {
    speechLang = 'hi-IN';
    text = `आज की सिफ़ारिश: स्थान ${rec.location.nameHi}. बिक्री का समय शाम पांच बजे से आठ बजे तक. अवसर स्कोर ${rec.opportunityScore} है. ग्राहक मांग बहुत अच्छी है और ठेला प्रतियोगिता कम है. स्थिरता स्कोर ${rec.stabilityScore} है. आज टमाटर, आलू और प्याज रखने से अधिकतम कमाई होगी.`;
  } else {
    speechLang = 'en-IN';
    text = `Today's recommendation. Location: ${rec.location.name}. Best selling window: ${rec.bestSellingWindow}. Opportunity score: ${rec.opportunityScore} out of 100. Demand is high, competition is ${rec.competitionLevel}, and stability score is ${rec.stabilityScore}. Recommended produce: Tomato, Potato, and Onion.`;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = speechLang;
  utterance.rate = 0.95; // Slightly measured pace for clarity in bustling street conditions
  utterance.pitch = 1.0;

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

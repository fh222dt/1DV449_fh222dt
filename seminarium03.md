# Förberedelse seminarium 03
##Del 1 – Projektidé
Jag har tankar på att göra en karta över de miljöfarliga utsläpp som sker i Sverige. Naturvårdsverket har data för industriutsläpp från de företag som har tillstånd att släppa ut farliga ämnen. Man ska kunna se på kartan om det finns mycket utsläpp i sin närmiljö där man bor t ex. Jag kommer använda Google Maps för kartdelen. Jag har även småfunderingar på om man ska använda MSB api för att kunna visa om det finns något farligt utsläpp som pågår just nu, men jag har inte satt mig in i det api:et.

* Google Maps dokumentation är väldigt omfattande, på det sättet att man får väldigt grundläggande kunskaper om hur man använder api:et. Naturvårdsverket har också en rätt bra dokumentation med exempel på hur man kan jobba för att nå deras data, och de har länkat vidare till mer information hos andra. Däremot hittar jag inga bra exempel på hur datan kan se när man hämtar den, utan de visar på diagram som bygger på den datan som exempel istället. 
* Industriutsläpp ger data i formatet oData, Maps använder javascript. 
* Industriutsläpp har licens CC0, vilket innebär att jag får nyttja informationen fritt. Maps har en begränsning på 25 000 kartladdningar per dag för gratis användande.
* Datat från Industriutsläpp kan upplevas som gammalt, det uppdateras endast 2 gånger om året. Det är alltid en risk i allmänhet att förlita sig på andras data för att bygga en tjänst, då källan kan få för sig att ändra sitt data på något sätt. 

## Del 2 - Fallstudie - Exempel på en bra befintlig mashup-applikation
Jag har tittat på PadMapper http://www.padmapper.com/ som presenterar tillgängliga hyresbostäder på en karta i USA. De hämtar annonser från CraigsList, och andra annonssidor som placeras ut på Google Maps. CraigsList verkar inte gilla denna applikation då de stämt dem för att ha tagit data från deras annonser. Men PadMapper finns kvar, och det sägs att CraigsList håller på med en egen karttjänst i vissa områden av USA.

* Det är en till synes enkel tjänst som tar två datakällor som man kan tycka är rätt så ok att använda var för sig och kombinerar dem på ett snyggt sätt. 
* Att söka bostad via karta istället för radannons är ju både roligare och enklare, för ofta vet man ju vart man vill bo, och kan då hålla reda på marknaden i ett visst område via kartan, snarare än att lära sig alla adresser som finns där.

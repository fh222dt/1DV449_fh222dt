# Laboration 2 Rapport
Min labb kan nås via [http://fridaholmstrom.se/php/wt2/l02/](http://fridaholmstrom.se/php/wt2/l02/)
## Optimeringar
Jag har lagt upp koden på en domän hos Binero för att få en verkligare testmiljö, än att bara köra lokalt. Min första mätning gav i genomsnitt ett resultat på 2,92 sek. Det var 18 anrop och totalt 2.4 MB. Alla mina mätningar är ett snitt av 3 mätningar.

### Ordning bland css-filerna
Den första optimeringen jag gjorde var att flytta ut all css-kod som låg inline till en extern fil vid namn custom.css. Detta förbättrar prestandan genom att webbläsaren kan cacha dessa filer, speciellt om man har en applikation med många sidor. _(High Performance Web Sites by Steve Souders, kap 8)_ Jag har också sett till att länka alla css:er uppe i headern för att inte vissa webbläsare ska blockera renderingen av sidan tills de kommer åt css-filen _(High Performance Web Sites by Steve Souders, kap 5)_ Detta gjorde det inte bara lite sabbare utan också mer lätt att underhålla koden framöver.

Före åtgärd: 2,92 sek, 18 anrop, 2,4MB

Efter åtgärd: 2,42 sek, 19 anrop, 2,4MB

### Script på ett ställe
Sedan gick jag vidare till alla script, och la dem också i externa filer. Jag la in alla inlinescript i samma fil för att spara på anropen. Jag flyttade även länkarna till sist i bodyn så att inte renderingen fastnar i ett script _(High Performance Web Sites by Steve Souders, kap 6)_. Också här blev det bättre för cachningen att ha filerna externt _(High Performance Web Sites by Steve Souders, kap 8)_. Denna åtgärd gav en lite längre svarstid men jag upplever det ändå som mer lätthanterligt att ha alla script externt.

Före åtgärd: 2,42 sek, 19 anrop, 2,4MB

Efter åtgärd: 2,53 sek, 20 anrop, 2,4MB

### Css från annan webbplats
Det fanns lite css som hämtades från en annan webbplats som jag helt enkelt kopierade för att inte vara beroende av vad som händer på den webbplatsen som jag inte har kontroll över. _(High Performance Web Sites by Steve Souders, kap 1)_ Det gav en stor skillnad på svarstiden, trots att det rörde sig om så lite kod. 

Före åtgärd: 2,53 sek, 20 anrop, 2,4MB

Efter åtgärd: 1,91 sek, 20 anrop, 2,4MB

### Döda länkar
Jag hittade några filer som efterfrågades som inte fanns med. Servern lägger resurser i onödan på att hitta filer som inte finns. När jag tog bort länkarna till dessa fick jag bättre svarstid eftersom jag också fick färre anrop._( High Performance Web Sites by Steve Souders, kap 1 och http://behosting.com/compleat/knowledgebase.php?action=displayarticle&id=62)_ Det är ju dessutom dumt att länka in saker man inte har. 

Före åtgärd: 1,91 sek, 20 anrop, 2,4MB

Efter åtgärd: 677 ms, 16 anrop, 2,4MB

### Rätt storlek på bilder
Det finns en bild som länkas in varje gång sidan visas som heter food.jpg som var enormt stor för det den används till. Jag minskade ner den något i kvalitet men framför allt mått i photoshop och fick ett bra resultat ändå. Det är onödigt att ha större bilder än vad som man har behov av, då de tar längre tid att hämta hem från servern då. _( High Performance Web Sites by Steve Souders, kap 1)_ Svarstiden blev av någon anledning inte mycket bättre, men storleken på allt som anropas krympte rejält.

Före åtgärd: 677 ms, 16 anrop, 2,4MB

Efter åtgärd: 680 ms, 16 anrop, 526kb

### Använder CDN
Speciellt för stora applikationer med mycket trafik världen över är det rekommenderat att använda ett CDN för att sprida ut serverresurserna. _(High Performance Web Sites by Steve Souders, kap 2)_ Jag har lagt upp bootstrap och jquery på deras CDN för att få del av dessa fördelar. Detta gav inte så stor effekt i detta fall då det inte är så mycket trafik hit, men om man tänker sig in i en framtid så är det en god vana att lära sig.

Före åtgärd: 680 ms, 16 anrop, 526kb

Efter åtgärd: 752 ms, 17 anrop, 331kb

## Säkerhet

### Utloggning
Det finns en funktion för en inloggad användare att logga ut, som inte gjorde det på ett bra sätt. Jag har sett till att döda sessionen i samband med att man klickar på logga ut istället för att det dör när webbläseren stängs. Det kan vara farligt att en session lever vidare när man har en dator i en delad miljö. Då kan en annan person som sätter sig vid samma dator utnyttja den sessionen. Det ger en falsk säkerhet åt användaren som tror hon loggat ut men inte har det. 

### Validera indata till login-formuläret
Om man inte validerar vad användare skriver in i formulärfält är det ibland möjligt att otrevliga användare skriver in farlig kod i form av olika script som en dåligt skriven kod kan skicka rätt in i en databas. Därför har jag sett till att validera indatat från taggar och konstiga tecken. 

### Validera indata till meddelanden hos producenter
Jag ser samma risk med ovaliderad indata bland meddelandena, så jag har gjort samma åtgärd här. Det finns ingen anledning att erbjuda styling av användares meddelanden så alla taggar tas också bort.

### Databasen
Jag ville egentligen se till att det inte finns för mycket rättigheter på databasanvändaren, men eftersom det inte går på den typ av databas som används, ville jag ändå säkra upp den en viss del. Därför har jag i alla fall satt filrättigheterna till 700 på databasfilerna och blockerat dem i en .htaccess för att inte kunna laddas ner hur enkelt som helst. Man vill ju inte att vem som helst ska kunna ladda ner ens databas med användare och annan känslig information som kan tänkas finnas där. 

##Ajax
Jag har försökt använda mig av den kod som finns för att göra mitt ajaxanrop. Detta håller nere svarstiden tänkte jag. Så istället för att visa en alert när en användare har tryckt på skicka meddelande så körs en ny liten kod som först tömmer div:en med alla p-taggar som innehåller meddelanden och sedan fyller dem med allihop igen. Sedan har jag klurat på den där ordningen som blev så konstig och kom till slut fram till att problemet var att ajax-anropet körs asynkront, när jag istället kör det synkront fungerar allt korrekt som det var sedan innan, plus att ordningen blir rätt. Jag har lyft ut den koden som fyller upp meddelandena i en egen funktion för att kunna anropa den separat. 


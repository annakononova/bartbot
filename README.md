##### NOTE: Used /weather-bot as an example: http://www.yravi.com/2016/03/25/writing-a-custom-slash-command-for-slack.html

# Bartbot Slash command:
`/bartbot` command returns Bart Schedule for the next 4 Trains based on the user input and displays the following information: 


- Trip Fare
- Trip Time
- CO2 emissions saved
- Departure Time
- Arrival Time

### How to use the `/bartbot` command:
Enter `/bartbot` followed by Origin and Destination Stations using 4 letter abbreviations [listed below](#list-of-station-abbreviations)

For example:
`/bartbot mont phil`  - this will display *Next 4 Trains from Montgomery st (SF) to Pleasant Hill*

### Nice to add features (Phase 2):

- `/bartbot stations` that will show abbreviations of all the Stations
- `/bartbot map` - shows the map of Bart system
- Ability to recognize full or partial Stations name
- Ability to specify Departure or Arrival time and show schedule based on that time
- It would be nice to have some form of Error handling. For example when user enters an incorrect abbreviation of a Bart Station, slash command would return meaningful message instead of 503 service error



### Installation:

1. Clone repo:
 `git clone git@github.com:annakononova/bartbot.git`
2. `cd bartbot`
3. `npm install`
4. If you don't have heroku installed and configured:

  - `brew install heroku-toolbelt`
  - `heroku login`
  - `heroku create` (note URL and Git repo for your Heroku dyno) 
5. `git remote -v` to check that heroku is configured as remote
6. `git push heroku master`
7. `heroku open` - should open web browser with `Running!! It works!` text
8. Open slack, go to your team’s custom integration page and add a slash command (https://my.slack.com/services/new/slash-commands)
9. Type `/bartbot` in choose command and click `Add slash command integration` button
10. In URL field put your heroku address and append `post` at the end. Something like `https://booger-nose-36723.herokuapp.com/post`
11. Leave method as `POST`
12. Set customize name as `Bart Bot` (optional)
13. Choose icon or emoji for icon (optional)
14. Add autocomplete text:

  - Description: `Show bart schedule` 
  - Usage hint: `[origin] [destination]` (optional)
15. Add descriptive label `Show bart schedule` (optional)
16. Click `Save Integration`
17. Go to your Team
18. Open any Channel and type /bartbot mont phil 

### List of Station abbreviations

```javascript

  "12th": "12th St. Oakland City Center",
  "16th": "16th St. Mission (SF)",
  "19th": "19th St. Oakland",
  "24th": "24th St. Mission (SF)",
  "ashb": "Ashby (Berkeley)",
  "antc": "Antioch",
  "balb": "Balboa Park (SF)",
  "bayf": "Bay Fair (San Leandro)",
  "cast": "Castro Valley",
  "civc": "Civic Center (SF)",
  "cols": "Coliseum",
  "colm": "Colma",
  "conc": "Concord",
  "daly": "Daly City",
  "dbrk": "Downtown Berkeley",
  "dubl": "Dublin/Pleasanton",
  "deln": "El Cerrito del Norte",
  "plza": "El Cerrito Plaza",
  "embr": "Embarcadero (SF)",
  "frmt": "Fremont",
  "ftvl": "Fruitvale (Oakland)",
  "glen": "Glen Park (SF)",
  "hayw": "Hayward",
  "lafy": "Lafayette",
  "lake": "Lake Merritt (Oakland)",
  "mcar": "MacArthur (Oakland)",
  "mlbr": "Millbrae",
  "mont": "Montgomery St. (SF)",
  "nbrk": "North Berkeley",
  "ncon": "North Concord/Martinez",
  "oakl": "Oakland Int'l Airport",
  "orin": "Orinda",
  "pitt": "Pittsburg/Bay Point",
  "pctr": "Pittsburg Center",
  "phil": "Pleasant Hill",
  "powl": "Powell St. (SF)",
  "rich": "Richmond",
  "rock": "Rockridge (Oakland)",
  "sbrn": "San Bruno",
  "sfia": "San Francisco Int'l Airport",
  "sanl": "San Leandro",
  "shay": "South Hayward",
  "ssan": "South San Francisco",
  "ucty": "Union City",
  "warm": "Warm Springs/South Fremont",
  "wcrk": "Walnut Creek",
  "wdub": "West Dublin",
  "woak": "West Oakland"

```


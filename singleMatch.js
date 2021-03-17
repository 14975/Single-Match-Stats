let request=require("request");
let cheerio=require("cheerio");
let statsArr=[];
let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
request(url,cb);
function cb (err,response,html)
{
    let chselector=cheerio.load(html);
    let bothMatches=chselector(".match-header .match-info.match-info-MATCH .teams .team");
    console.log(bothMatches.length);
    for(let i=0;i<bothMatches.length;i++)
    {
        let isLoosing=chselector(bothMatches[i]).hasClass("team-gray");
        if(isLoosing==false)
        {
            let myTeamElem=chselector(bothMatches[i]).find(".name-detail a");
            let myTeam=myTeamElem.text();
            let colInnings=chselector(".Collapsible")
            let bothInningsTeamName=chselector(".Collapsible .header-title.label");
            for(let j=0;j,bothInningsTeamName.length;j++)
            {
                let teamName=chselector(bothInningsTeamName[j]).text();
                let teamFirstName=teamName.split("INNINGS")[0];
                teamFirstName=teamFirstName.trim();
                if(teamFirstName==myTeam)
                {
                    let winTeamInning=chselector(colInnings[j]);
                    printTeamStats(winTeamInning,chselector);
                }
            }
        }
    }
}
function printTeamStats(winTeamInning,chselector)
{
    let allRows=chselector(winTeamInning).find(".table.batsman tbody tr");
    for(let j=0;j<allRows.length;j++)
    {
        let eachbatcol=chselector(allRows[j]).find("td");
        if(eachbatcol.length==8)
        {
            let playerName=chselector(eachbatcol[0]).text();
            let runs=chselector(eachbatcol[2]).text();
            statsArr.push({
                Name:playerName,
                Runs:runs
            })
        }
    }
    console.table(statsArr);
}
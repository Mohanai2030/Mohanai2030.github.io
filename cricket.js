
document.querySelector('button.toss').addEventListener("click",choose);
const userbtns = document.querySelectorAll('div.choose button');
const tosschoose = document.querySelector('.tosstext');

let userscore=0;
let computerscore=0;

let innings = 0;
let totalplays = -1;
let bat = "";

function choose() 
{
  let comtosschoice;
  tosschoose.innerHTML=`<button class="choice" id="0">HEADS</button>or<button class="choice" id="1">TAILS</button>`; 
  document.querySelector('button.toss').remove();
  
  const choices= document.querySelectorAll('.choice');
  for (let z=0;z<choices.length;z=z+1)
  {
    choices[z].addEventListener("click",comparetoss);
  };

  function comparetoss(e)
  {
    comtosschoice= Math.floor(Math.random()*2);
    
     if (e.target.id == comtosschoice){
      tosschoose.innerHTML= "You have won the Toss.";
      tosschoose.innerHTML="<button class='playchoice1'>Bowling</button>or<button class='playchoice2'> Batting </button>";

       const userwontossbowl = document.querySelector('.playchoice1');
       userwontossbowl.addEventListener("click",userplaychoice,{once:true});

       const userwontossbat = document.querySelector('.playchoice2');
       userwontossbat.addEventListener("click",userplaychoice,{once:true});

       function userplaychoice () 
       {
          if (this.classList[0]=="playchoice1")
          {
            bat = "computer";
            tosschoose.innerHTML="You have chosen to bowl first";
            emojiDisplay("ball","bat");
            readymatch();
          }

          else if(this.classList[0]=="playchoice2")
          {
            bat = "user";
            tosschoose.innerHTML="You have chosen to bat first";
            emojiDisplay("bat","ball");
            readymatch(); 
          }
          setTimeout(()=>{
            play();
          },5000);
       }
      
     }else {
       tosschoose.innerHTML= "You lost the Toss.<br>";
       const waittext= ` 
       Waiting for Opponent's decision`;
       tosschoose.append(waittext);
       const delay =setTimeout(comptosschoice,1500);
     }
  } 

  function comptosschoice() 
  {
    y = (Math.floor(Math.random()*2)); 
    if (y==0){
      tosschoose.innerHTML= "Opponent has chose to bat first";
      bat="computer";
      emojiDisplay("ball","bat");
      readymatch();
     }else if(y==1){
      tosschoose.innerHTML= "Opponent has chose to bowl first";
      bat="user";
      emojiDisplay("bat","ball");
      readymatch();
    }
    setTimeout(()=>{
      play();
    },5000);
  }   
}

function readymatch() 
{
  setTimeout(()=>{
    tosschoose.innerHTML="Get ready for the match in";
    inittimervar(tosschoose,3);
  },2000);
  
  setTimeout(()=>{
      tosschoose.innerHTML="";
  },5000); 

};

function emojiDisplay(userchoice,computerchoice)
{
  document.querySelector('.ph1').innerHTML=`<div>You</div><div><img src="/cricket ${userchoice}.png" alt="${userchoice}" width="30px" height="30px"></div>`;
  document.querySelector('.ph2').innerHTML=`<div>Computer</div><div><img src="/cricket ${computerchoice}.png" alt="${computerchoice}" width="30px" height="30px"></div>`;
}

function play(exception) 
{ 
  //add comments to each 12 balls 
  //seperate comments for batting and bowling
  console.log("inside play function");
  if (exception==1)
  {
    for (let w=0;w<userbtns.length;w=w+1)
    {
      userbtns[w].removeEventListener("click",compareplay);
      userbtns[w].removeEventListener("click",dummy,{once:true});
    }
    let css1= 'div.choose button:hover{background-color: buttonface;color:black;border:2px solid black}';
    var style2 = document.createElement('style');
    style2.append(document.createTextNode(css1));
    document.getElementsByTagName('head')[0].appendChild(style2);

    let css2= 'div.choose button{cursor: initial}';
    var style3 = document.createElement('style');
    style3.append(document.createTextNode(css2));
    document.getElementsByTagName('head')[0].appendChild(style3);
    
  }else{
    const usertimer = document.querySelector('.usertimer');
    let timervar = inittimervar(usertimer,10);
    let timeoutvar = setTimeout(compareplay,10000);

    let css= 'div.choose button:hover{background-color: black;color:white;border:2px solid white;}';
    var style1 = document.createElement('style');
    style1.append(document.createTextNode(css));
    document.getElementsByTagName('head')[0].appendChild(style1);
    
    for (w=0;w<userbtns.length;w=w+1)
    {
      userbtns[w].addEventListener("click",compareplay);
      userbtns[w].addEventListener("click",dummy,{once:true});
    }
    
    function dummy(e)
    {
      clearTimeout(timeoutvar);
      timervar(1);
      insidedummy(Number(e.target.innerHTML)-1);
    }
  
    function insidedummy(x) 
    {
      for (let w=0;w<userbtns.length;w=w+1)
      {
        if (w==x)
        {
          continue;
        }
        userbtns[w].removeEventListener("click",dummy,{once:true});
      }
    }
  }
}

let initialuser=0;
let initialcomputer=0;
let previous=0;
function compareplay() 
{ 
  document.querySelector('.comments').innerText="";
  document.querySelector(".inormat").innerHTML="";
  const userplay = (Number(this.innerHTML))||Math.floor(((Math.random())*6)+1);
  const complay = Math.floor(((Math.random())*6)+1);

  document.querySelector(`div.choose button:nth-child(${userplay})`).style.cssText="border: 3px solid red;";
  previous && (document.querySelector(`div.choose button:nth-child(${previous})`).style.cssText="border: 2px solid black;");
  previous=userplay;

  if (bat=="user")
  {
    if(userplay == complay)
    {
      display_play_image(userplay,complay);
      document.querySelector('.comments').innerText="It's a WICKET!";
      if (totalplays>=-1 && totalplays<=5) 
      {
        totalplays = 6;
        spandisplay("user","w");
        document.querySelector(".inormat").innerHTML="First Innings Over";
        bat="computer";
        emojiDisplay("ball","bat");
        target(1,'user',0,'computer'); 
        play(); 
      }
      else if(totalplays>=6 && totalplays<12) 
      {
        spandisplay("user","w")
        result();
      } 
    }
  
    else
    {
      if (totalplays<12 && totalplays>=-1) 
      { 
          spandisplay("user"," ",userplay);
          totalplays+=1;
          display_play_image(userplay,complay);
          userscore+=userplay;
          document.querySelector("span.userscore").innerHTML=`${userscore}`;
          if (totalplays==5)
          {
            document.querySelector(".inormat").innerHTML="First Innings Over";
            bat="computer";
            emojiDisplay("ball","bat");
            totalplays+=1; 
          }
          
          

          if (totalplays==6)
          {
            target(1,'user',1,'computer');
          }

          if (totalplays>6)
          {
            target(0,'computer',1,'user');
            if (totalplays==12)
            {
              result();
            }
          }

          if (totalplays>=0 && totalplays<6)
          {
            play();
          }
      }
    }
  }

  else if (bat=="computer")
    {
      if(userplay == complay)
      {
        display_play_image(userplay,complay);
        document.querySelector('.comments').innerText="It's a WICKET!";
        if (totalplays>=-1 && totalplays<=5) 
        {
          totalplays=6;
          bat="user";
          emojiDisplay("bat","ball");
          spandisplay("computer","w");
          document.querySelector(".inormat").innerHTML="First Innings Over";
          target(1,'computer',0,'user');
          play();
        }
        else if(totalplays>=6 && totalplays<12) 
        {
          spandisplay("computer","w");
          result();
        }
      }

      else 
      { 
        if (totalplays<12 && totalplays>=-1)
        {
          spandisplay("computer"," ",complay);
          totalplays+=1;
          display_play_image(userplay,complay);
          computerscore+=complay;
          document.querySelector('span.computerscore').innerHTML=`${computerscore}`;
          
          if (totalplays==5)
          {
            document.querySelector(".inormat").innerHTML="First Innings Over";
            bat="user";
            emojiDisplay("bat","ball");
            totalplays+=1;
          }
          
          if(totalplays==6)
          {
            target(1,'computer',1,'user');
            
          }

          if (totalplays>6)
          {
            target(0,'user',1,'computer');
            if (totalplays == 12)
            {
               result();
            }
          }

          if (totalplays>=0 && totalplays<6)
          {
            play();
          }
        } 
      }
    } 
  }

let inittimervar = function timeradd(item,begin)
{
    let timerbtn = document.createElement("span");
    timerbtn.style.cssText="display:inline-flex;background-color:yellow;border:2px solid black;height: 20px;width: 20px;align-items: center;justify-content: center;border-radius: 50%;";
    item.append(timerbtn);
    timerbtn.innerHTML=`${begin}`;
    begin=begin-1;
    const timer = setInterval(decrease,1000);
    
    function decrease ()
    {
        if(begin==-1)
        {
          clearInterval(timer);
          timerbtn.remove();
        }
        timerbtn.innerHTML=`${begin}`;
        begin=begin-1;
    }
    
    function stop(x)
    {
      if (x)
      {
        clearInterval(timer);
        timerbtn.remove();
      } 
    }
    return stop;
}

function result() 
{
  play(1);
  document.querySelector('.userhowmuchmore').innerHTML=" ";
  document.querySelector('.computerhowmuchmore').innerHTML=" ";
  document.querySelector('div.inningsbreak').innerHTML=" ";
  document.querySelector(".inormat").innerHTML="End of match<br>";

  const finaluserscore= Number(document.querySelector('.userscore').innerHTML);
  const finalcomputerscore= Number(document.querySelector('.computerscore').innerHTML);

  const displayresult = document.querySelector('.finalresult');
  if(finaluserscore>finalcomputerscore) 
  {
    displayresult.innerHTML="Congartulations!You have WON the game";
  }
  else if(finalcomputerscore>finaluserscore) 
  {
    displayresult.innerHTML="Hard luck.You LOST the game.Better luck next time";
  }
  else if(finaluserscore ==0) 
  {
    displayresult.innerHTML="So close!.Game TIED";
  }
  let playagain=document.createElement("button");
  playagain.innerHTML="Play again";
  document.querySelector(".inormat").append("  ");
  document.querySelector(".inormat").append(playagain);
  playagain.addEventListener("click",playagainfunc,{once:true});

  function playagainfunc()
  {
    window.location.reload();
  }
}

let remainingruns=0;
let firstinningscore=0;
function target (innings=0,whohad,y_or_n_to_result=0,whowill) 
{
  if(innings==1)
  {
    let decideword;
    if (whohad=="user")
    {
      firstinningscore = Number(document.querySelector(`.userscore`).innerHTML);
      decideword="defend";
    }
    else if (whohad=="computer")
    {
      firstinningscore = Number(document.querySelector(`.computerscore`).innerHTML);
      decideword="score";
    }
    document.querySelector('div.inningsbreak').innerHTML=`You have to ${decideword} ${Number(firstinningscore)+1} runs to win`;
  }
  
 
  if (y_or_n_to_result==1)
  {
    let currentScore;
    (whowill=="user")?toresult('user'):toresult('computer');
    function toresult(who) 
    {
      currentScore= (who=='user')?Number(document.querySelector('.userscore').innerHTML):Number(document.querySelector('.computerscore').innerHTML);
      remainingruns = (firstinningscore+1) - currentScore;
      if(currentScore>=firstinningscore+1)
      {
        if (who=="user")
        {
          document.querySelector(`.userhowmuchmore`).innerHTML=` `;
        }
        else if(who == "computer")
        {
          document.querySelector(`.computerhowmuchmore`).innerHTML=` `;
        }
        result();
      }
      else
      {
        if (who=="user")
        {
          document.querySelector(`.userhowmuchmore`).innerHTML=`${remainingruns} more runs to win`;
        }
        else if(who == "computer")
        {
          document.querySelector(`.computerhowmuchmore`).innerHTML=`${remainingruns} more runs to win`;
        }
        play();
      } 
    }
  }


}

function spandisplay(player,worno=" ",playchoice) 
{
   if (player=="user")
   {
    initialuser+=1;
    if (worno=="w")
    {
      nowspan = document.querySelector(`.userd span:nth-child(${initialuser})`);
      nowspan.innerHTML="W";
      for (let x=initialuser+1;x<=6;x=x+1)
      {
        nowspan = document.querySelector(`.userd span:nth-child(${x})`);
        nowspan.innerHTML="NA";
      }
    }
    else
    {
      let nownum =playchoice;
      let nowspan;
      nowspan = document.querySelector(`.userd span:nth-child(${initialuser})`);
      nowspan.innerHTML=`${nownum}`;  
    } 
   }
   else if(player=="computer")
   {
    initialcomputer+=1;
    if (worno=="w")
    {
      nowspan = document.querySelector(`.computerd span:nth-child(${initialcomputer})`);
      nowspan.innerHTML="W";
      for (let y=initialcomputer+1;y<=6;y=y+1)
      {
        nowspan = document.querySelector(`.computerd span:nth-child(${y})`);
        nowspan.innerHTML="NA";
      }
    }
    else
    {
      let nownum = playchoice;
      let nowspan;
      nowspan = document.querySelector(`.computerd span:nth-child(${initialcomputer})`);
      nowspan.innerHTML=`${nownum}`; 
    }
   }
}

function display_play_image(userplay,complay) 
{
   switch (userplay)
   {
    case 1:
      {
        document.querySelector(".userimage").innerHTML=  '<img src="finger1.png.png" alt="One" width="64" height="64">';
        break;
      }
    case 2:
      {
        document.querySelector(".userimage").innerHTML=  '<img src="finger2.png.png" alt="Two" width="64" height="64">'
        break;
      }
    case 3:
      {
        document.querySelector(".userimage").innerHTML=  '<img src="finger3.png.png" alt="Three" width="64" height="64">'
        break;
      }
    case 4:
      {
        document.querySelector(".userimage").innerHTML=  '<img src="finger4.png.png" alt="Four" width="64" height="64">'
        break;
      }
    case 5:
      {
        document.querySelector(".userimage").innerHTML=  '<img src="finger5.png.png" alt="Five" width="64" height="64">'
        break;
      }
    case 6:
      {
        document.querySelector(".userimage").innerHTML=  '<img src="finger6.png.png" alt="Six" width="64" height="64">'
        break;
      }
   }

   switch (complay)
   {
    case 1:
      {
        document.querySelector(".compimage").innerHTML=  '<img src="finger1.png.png" alt="One" width="64" height="64">'
        break;
      }
    case 2:
      {
        document.querySelector(".compimage").innerHTML= '<img src="finger2.png.png" alt="Two" width="64" height="64">'
        break;
      }
    case 3:
      {
        document.querySelector(".compimage").innerHTML= '<img src="finger3.png.png" alt="Three" width="64" height="64">'
        break;
      }
    case 4:
      {
        document.querySelector(".compimage").innerHTML= '<img src="finger4.png.png" alt="Four" width="64" height="64">'
        break;
      }
    case 5:
      {
        document.querySelector(".compimage").innerHTML= '<img src="finger5.png.png" alt="Five" width="64" height="64">'
        break;
      }
    case 6:
      {
        document.querySelector(".compimage").innerHTML= '<img src="finger6.png.png" alt="Six" width="64" height="64">'
        break;
      }
     

   }
}


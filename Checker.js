"use strict"

const formChecker = {
  version: '2.1',
  repoUrl: 'https://github.com/LennardKu/Password-Checker',
  miniumPasswordLength: 4,

  init: async function () {

    this.credits();

    let checkableForms = document.querySelectorAll('[data-form-checker]');
    for (let index = 0; index < checkableForms.length; index++) {
      let options = await this.getOptions(checkableForms[index]);
      await new formChecker.config(checkableForms[index],options);
    }

    this.log('Init complete',`Setup`);
  },

  config: function (element,options) {

    if(!formChecker.elementChecker(element)){
      return false;
    }
    
    let minimum = [],
    doneWith = [];

    if (formChecker.checkOption('email-checker', options)) {
      minimum.push('email-checker');
    }

    if (formChecker.checkOption('password-repeat', options)) {      
      minimum.push('password-repeat');
      if (!element.querySelectorAll('input[data-repeat-password]').length) {
        formChecker.passwordRepeat(element); // Create repeat password field
      }
    }

    if(formChecker.checkOption('common-password', options)){
      minimum.push('common-password');
    }

    if(formChecker.checkOption('button', options)){
      let button = element.querySelectorAll('[type="submit"]');
      if (minimum.length > 0 && button.length) {
        button[0].setAttribute('disabled', true);
      }
    }

    element.setAttribute('data-form-checker', minimum.length);

    element.addEventListener('keyup', function() {

      if (formChecker.checkOption('email-checker', options)) {
        if (formChecker.emailChecker(formChecker.emailValidator(element))) {
          if (!doneWith.includes('email-checker')) {
            doneWith.push('email-checker');
          }
        } else {
          if (doneWith.includes('email-checker')) {
            doneWith.splice(doneWith.indexOf('email-checker'), 1);
          }
        }
      }
      
      if (formChecker.checkOption('password-repeat', options)) {
        if (formChecker.checkRepeatedPassword(element)){
          if (!doneWith.includes('password-repeat')) {
            doneWith.push('password-repeat');
          }
        } else {
          if (doneWith.includes('password-repeat')) {
            doneWith.splice(doneWith.indexOf('password-repeat'), 1);
          }
        }
      }

      if (formChecker.checkOption('common-password', options)) {
        if (formChecker.commonPassword(element)) {
          if (!doneWith.includes('common-password')) {
            doneWith.push('common-password');
          }
        } else {
          if (doneWith.includes('common-password')) {
            doneWith.splice(doneWith.indexOf('common-password'), 1);
          }
        }
      }

      if(formChecker.checkOption('button', options)){
        console.log(doneWith);
        let button = element.querySelectorAll('[type="submit"]');
        if (minimum.length == doneWith.length && button.length) {
          button[0].removeAttribute('disabled');
        }else{
          button[0].setAttribute('disabled', true);
        }
      }

    });
    
  },

  getOptions: function (element) {
    let elementAttributes = {},
    i = 0;

    while(i < element.attributes.length){
        if(element.attributes[i].name.includes("data-")){
            elementAttributes[element.attributes[i].name] = element.attributes[i].value
        }
        i++;
    }

    return elementAttributes;
  },

  checkOption: function (type,options) {
    let option;
    for (option in options){
      try {
        if(option == `data-${type}` || option == `${type}`){
          return true;
        }
      } catch(e){continue} // avoid localStorage security error
    }
  },

  elementChecker: function (element){
    if(!element){
      this.log(`Element not found: ${element}`,'element.not.found');
      return false;
    }
    return true;
  },

  emailValidator: function (element) { 
    
    if(!this.elementChecker(element)){
      return false;
    }
    
    let emailInput =  element.querySelectorAll('input[type="email"]')[0].value;

    if(formChecker.emailChecker(emailInput)){
      return true;
    } 

    return false;
  },

  emailChecker: function (email) {
    return true;
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(validRegex)) {
      return true;
    }  
    return false;  
  },

  passwordRepeat: function (element) {
    let passwordField = element.querySelectorAll('input[type="password"]');

    if(!this.elementChecker(passwordField)){
      return false;
    }

    let repeatPassword = passwordField[0].cloneNode(true);
    repeatPassword.classList.add('password-repeat');
    repeatPassword.setAttribute('data-repeat-password','true');
    passwordField[0].parentNode.insertBefore(repeatPassword, passwordField[0].nextSibling);

  },

  commonPassword: function (element) {
    let passwordField = element.querySelectorAll('input[type="password"]')[0];
    if(!passwordField){
      return false;
    }

    let ForbiddenSequences = ["123456","password","12345678","1234","pussy","12345","dragon","qwerty","696969","mustang","letmein","baseball","master","michael","football","shadow","monkey","abc123","pass","6969","jordan","harley","ranger","iwantu","jennifer","hunter","2000","test","batman","trustno1","thomas","tigger","robert","access","love","buster","1234567","soccer","hockey","killer","george","sexy","andrew","charlie","superman","asshole","dallas","jessica","panties","pepper","1111","austin","william","daniel","golfer","summer","heather","hammer","yankees","joshua","maggie","biteme","enter","ashley","thunder","cowboy","silver","richard","orange","merlin","michelle","corvette","bigdog","cheese","matthew","121212","patrick","martin","freedom","ginger","blowjob","nicole","sparky","yellow","camaro","secret","dick","falcon","taylor","111111","131313","123123","bitch","hello","scooter","please","","porsche","guitar","chelsea","black","diamond","nascar","jackson","cameron","654321","computer","amanda","wizard","xxxxxxxx","money","phoenix","mickey","bailey","knight","iceman","tigers","purple","andrea","horny","dakota","aaaaaa","player","sunshine","morgan","starwars","boomer","cowboys","edward","charles","girls","booboo","coffee","xxxxxx","bulldog","ncc1701","rabbit","peanut","john","johnny","gandalf","spanky","winter","brandy","compaq","carlos","tennis","james","mike","brandon","fender","anthony","blowme","ferrari","cookie","chicken","maverick","chicago","joseph","diablo","sexsex","hardcore","666666","willie","welcome","chris","panther","yamaha","justin","banana","driver","marine","angels","fishing","david","maddog","hooters","wilson","butthead","dennis","captain","bigdick","chester","smokey","xavier","steven","viking","snoopy","blue","eagles","winner","samantha","house","miller","flower","jack","firebird","butter","united","turtle","steelers","tiffany","zxcvbn","tomcat","golf","bond007","bear","tiger","doctor","gateway","gators","angel","junior","thx1138","porno","badboy","debbie","spider","melissa","booger","1212","flyers","fish","porn","matrix","teens","scooby","jason","walter","cumshot","boston","braves","yankee","lover","barney","victor","tucker","princess","mercedes","5150","doggie","zzzzzz","gunner","horney","bubba","2112","fred","johnson","xxxxx","tits","member","boobs","donald","bigdaddy","bronco","penis","voyager","rangers","birdie","trouble","white","topgun","bigtits","bitches","green","super","qazwsx","magic","lakers","rachel","slayer","scott","2222","asdf","video","london","7777","marlboro","srinivas","internet","action","carter","jasper","monster","teresa","jeremy","11111111","bill","crystal","peter","pussies","cock","beer","rocket","theman","oliver","prince","beach","amateur","7777777","muffin","redsox","star","testing","shannon","murphy","frank","hannah","dave","eagle1","11111","mother","nathan","raiders","steve","forever","angela","viper","ou812","jake","lovers","suckit","gregory","buddy","whatever","young","nicholas","lucky","helpme","jackie","monica","midnight","college","baby","brian","mark","startrek","sierra","leather","232323","4444","beavis","bigcock","happy","sophie","ladies","naughty","giants","booty","blonde","golden","0","fire","sandra","pookie","packers","einstein","dolphins","0","chevy","winston","warrior","sammy","slut","8675309","zxcvbnm","nipples","power","victoria","asdfgh","vagina","toyota","travis","hotdog","paris","rock","xxxx","extreme","redskins","erotic","dirty","ford","freddy","arsenal","access14","wolf","nipple","iloveyou","alex","florida","eric","legend","movie","success","rosebud","jaguar","great","cool","cooper","1313","scorpio","mountain","madison","987654","brazil","lauren","japan","naked","squirt","stars","apple","alexis","aaaa","bonnie","peaches","jasmine","kevin","matt","qwertyui","danielle","beaver","4321","4128","runner","swimming","dolphin","gordon","casper","stupid","shit","saturn","gemini","apples","august","3333","canada","blazer","cumming","hunting","kitty","rainbow","112233","arthur","cream","calvin","shaved","surfer","samson","kelly","paul","mine","king","racing","5555","eagle","hentai","newyork","little","redwings","smith","sticky","cocacola","animal","broncos","private","skippy","marvin","blondes","enjoy","girl","apollo","parker","qwert","time","sydney","women","voodoo","magnum","juice","abgrtyu","777777","dreams","maxwell","music","rush2112","russia","scorpion","rebecca","tester","mistress","phantom","billy","6666","albert"];
    if (ForbiddenSequences.includes(passwordField.value.toLowerCase().trim())) {
      return false;
    }
    return true;
  },

  checkRepeatedPassword : function (element) {
    
    let passwordField = element.querySelectorAll('input[type="password"]')[0],
    repeatedPassword = element.querySelectorAll('input[type="password"]')[1];

    if (passwordField.value == repeatedPassword.value && passwordField.value.length > formChecker.miniumPasswordLength) {
      return true;
    }
    return false;
  },

  log: function (message,errorType){
    console.log(`------ ${errorType} ------`);
    console.log(`${message}`);
  },

  credits: function () {
    this.log(`Lennard Kuenen Project version ${this.version}`,`Created By`);
    this.log(`${this.repoUrl}`,`Source code`);
  },

};


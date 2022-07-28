const Language = ((document.currentScript.getAttribute('lang')) ? document.currentScript.getAttribute('lang') : 'Nl');

const PasswordCheck =  (CheckPassword,Element,options,config)=>{
    
    RulesEngine = PasswordStrength = '';
    Invalid = [];
    MaxStrength = PasswordStrength = -1;

    /*
    *   Config 
    */  
    if(config == true && CheckPassword == false){
        
        // Check if Element exists 
        if(!jQuery('[password-checker="'+Element+'"]').length){
            alert('Password Element "'+Element+'" not found. '); // Not found alert
            return false;  // Stop executing
        }
    
        // Set values 
        Element = jQuery('[password-checker="'+Element+'"]');
        Element_uuid = 'password-checker-field-'+uuid(15);

        Element.attr(Element_uuid,true); // Create Element uuid
        
        // Add class 
        Element.addClass('password-check');

        DefaultOptions = {
            button:false,
            Repeat:true,
            CapitalLength:2,
            SpecialLength:1,
            PasswordLength:8,
            LowerLength:2,
            NummbersLength:2,
            type:'tooltip',
            RepeatPasswordField:'Repeat-password-field-'+uuid(20),
            TooltipUuid:'Tooltip-'+uuid(20),
            TooltipTitle:'Wachtwoord moet het volgende bevatten:'
        };

        // Setting default options
        Object.keys(DefaultOptions).forEach(key => {
            Element.attr('checker-'+key,DefaultOptions[key]); // Create Element keys 
        });

        // Put custum options
        Object.keys(options).forEach(key => {
            Element.attr('checker-'+key,options[key]); // Create Element keys 
        });

        // Create trigger script
        jQuery('body').append('<script type="text/javascript">jQuery(document).on("keyup","['+Element_uuid+']",function(e){ PasswordCheck(true,"['+Element_uuid+']"); }); jQuery(document).on("focus","['+Element_uuid+']",function(e){ PasswordCheck("focus","['+Element_uuid+']"); }); jQuery(document).on("focusout","['+Element_uuid+']",function(e){ PasswordCheck("focusout","['+Element_uuid+']"); });</script>');
        jQuery('body').append('<style>.password-check-tooltip span.strong{color:green} .password-check-tooltip span.weak{color:red} .password-check.weak{border-color:red;} .password-check.medium{border-color:orange;}.password-check.strong{border-color:green;} .password-check-tooltip{max-width:300px;width:100%;margin-top:30px;position:absolute;background:#fff}.password-check-tooltip h3,.password-check-tooltip span{display:block}</style>');
    }

    /*
    *   Uuid
    */
    function uuid(length){
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
       }
       return result;
    }

    // Standard values 
    RulesEngine.ForbiddenSequences = [
        "0123456789", "abcdefghijklmnopqrstuvxywz", "qwertyuiop", "asdfghjkl",
        "zxcvbnm", "!@#$%^&*()_+"
    ];


    input_strength_checker = (input)=>{

         /* --- Check letters --- */ 

        // Validate capital letters
        if(CapitalLength > 0){ // Check if CapitalLength is needed
            MaxStrength++;
            if((input.match(/[A-Z]/g) || []).length >= CapitalLength) {
                PasswordStrength++;  
            }else{
                Invalid[MaxStrength] = 'CapitalLength';
            } 
        }

            // Validate lower letters
            if(LowerLength > 0){ // Check if LowerLength is needed
            MaxStrength++;
            if((input.match(/[a-z]/g) || []).length >= LowerLength) {
                PasswordStrength++;  
            }else{
                Invalid[MaxStrength] = 'LowerLength';
            } 
        }

        // Validate special letters
        if(SpecialLength > 0){ // Check if SpecialLength is needed
            MaxStrength++;
            if((input.match(/[!@#$%^&]/g) || []).length >= SpecialLength) {
                PasswordStrength++;  
            }else{
                Invalid[MaxStrength] = 'SpecialLength';
            } 
        }

        // Validate nummbers letters
        if(NummbersLength > 0){ // Check if NummbersLength is needed
            MaxStrength++;
            if((input.match(/[0-9]/g) || []).length >= NummbersLength) {
                PasswordStrength++;  
            }else{
                Invalid[MaxStrength] = 'NummbersLength';
            } 
        }

        // Validate length
        if(PasswordLength > 0){ // Check if NummbersLength is needed
            MaxStrength++;
            if(PasswordLength <= input.length ){ 
                PasswordStrength++;  
            }else{
                Invalid[MaxStrength] = 'PasswordLength';
            }
        }
        
        // Check password Strength
        password_strength(MaxStrength,PasswordStrength,Invalid,input);
    }


    // Strength checker 
    password_strength = (MaxStrength,PasswordStrength,Invalid,Input)=>{
      
        // Strong
        if(MaxStrength <= PasswordStrength){
             password_response('strong'); 
             display_response('strong');
             return false; 
        }

        // Hide repeat password 
        if(jQuery('['+RepeatPasswordField+'="true"]').length){
            jQuery('['+RepeatPasswordField+'="true"]').hide(); // Hide repeat password
            jQuery('['+RepeatPasswordField+'="true"]').val(''); // Empty repeat password
        }

        if((MaxStrength / 2) <= PasswordStrength){
            display_response('medium');
            return false;
        }

        display_response('weak');

    };

    password_response = (Strength)=>{

        // Enable button 
        if(Strength == 'strong' && Repeat == 'false'){
            if(button !== false){ jQuery(button).attr('disabled',false);  return false;}
        }        

        if(Repeat == 'true'){ repeat_password(); }// Repeat password check

    };

    repeat_password = ()=>{
        jQuery('['+RepeatPasswordField+'="true"]').show(); 

        // Create field
        if(!jQuery('['+RepeatPasswordField+'="true"]').length){
            // Repeat password field 
            Element.after('<input type="password" '+RepeatPasswordField+'="true" />');
            jQuery('body').append('<script type="text/javascript">jQuery(document).on("keyup","['+RepeatPasswordField+']",function(e){ PasswordCheck("Repeat","['+Element_uuid+']"); });</script>');
        }
        
        if(input == jQuery('['+RepeatPasswordField+'="true"]').val()){
            jQuery(button).attr('disabled',false); 
            return;
        }
        jQuery(button).attr('disabled',true); 
        
    };

    display_response = (Strength)=>{

        if(Type == 'tooltip'){

            if(!jQuery('.'+TooltipUuid).length){

                TooltipContent = '<div class="'+TooltipUuid+' password-check-tooltip">';
                    TooltipContent += '<h3>'+TooltipTitle+'</h3>';

                    if(Language == 'Nl'){
                        FirsWord = 'Minimaal ';
                    }

                    if(Language == 'En'){
                        FirsWord = 'Minimal ';
                    }

                    if(PasswordLength > 0){ TooltipContent += '<span class="PasswordLength">'+FirsWord+PasswordLength+((Language == 'Nl') ? ' karakters' : ' characters')+' </span>'; }
                    if(NummbersLength  > 0){ TooltipContent += '<span class="NummbersLength">'+FirsWord+NummbersLength+((Language == 'Nl') ? ' nummers' : ' numbers')+'</span>'; }
                    if(SpecialLength > 0){ TooltipContent += '<span class="SpecialLength">'+FirsWord+SpecialLength+((Language == 'Nl') ? ' speciale karakters' : 'special characters')+'</span>'; }
                    if(CapitalLength > 0){ TooltipContent += '<span class="CapitalLength">'+FirsWord+CapitalLength+((Language == 'Nl') ? ' hoofdletters' : ' uppercase letters')+'</span>'; }
                    if(LowerLength > 0){ TooltipContent += '<span class="LowerLength">'+FirsWord+LowerLength+((Language == 'Nl') ? ' kleine letters' : ' lowercase letters')+'</span>'; }

                TooltipContent += '</div>';

                Element.after(TooltipContent);
            }

            jQuery('.password-check-tooltip span').addClass('strong');
            jQuery('.password-check-tooltip span').removeClass('weak');

            var arrayLength = Invalid.length;
            for (var i = 0; i < arrayLength; i++) {
                jQuery('.password-check-tooltip span.'+Invalid[i]).addClass('weak');
            }

            return false;
        }

        if(Type == 'border'){
            Element.removeClass('weak');
            Element.removeClass('medium');
            Element.removeClass('strong');
            Element.addClass(Strength);
            return false;
        }

    };

    /*
    *   Check password
    */
    if(CheckPassword == true){
        Element = jQuery(Element); // Element 

        button = Element.attr('checker-button');
        CapitalLength = Element.attr('checker-CapitalLength');
        SpecialLength = Element.attr('checker-SpecialLength');
        PasswordLength = Element.attr('checker-PasswordLength');
        LowerLength = Element.attr('checker-LowerLength');
        NummbersLength = Element.attr('checker-NummbersLength');
        RepeatPasswordField = Element.attr('checker-RepeatPasswordField');
        Repeat = Element.attr('checker-Repeat');
        Type = Element.attr('checker-type');

        // Tooltip 
        TooltipUuid = Element.attr('checker-TooltipUuid');
        TooltipTitle = Element.attr('checker-TooltipTitle');


        input = Element.val();
        
        if(button !== false){ jQuery(button).attr('disabled',true); }

        input_strength_checker(input);

    }

    /*
    *   Repeat password checker
    */
    if(CheckPassword == 'Repeat'){
        repeat_password();   // Repeat password checker
    }

    /*
    *   Focus
    */
    if(CheckPassword == 'focus'){
        Element = jQuery(Element); // Element 
        Type = Element.attr('checker-type');
        TooltipUuid = Element.attr('checker-TooltipUuid');

        if(Type == 'tooltip'){
            if(jQuery('.'+TooltipUuid).length){
                jQuery('.'+TooltipUuid).show();
            }
        }

    }

    if(CheckPassword == 'focusout'){
        Element = jQuery(Element); // Element 
        Type = Element.attr('checker-type');
        TooltipUuid = Element.attr('checker-TooltipUuid');

        if(Type == 'tooltip'){
            if(jQuery('.'+TooltipUuid).length){
                jQuery('.'+TooltipUuid).hide();
            }
        }

    }

};

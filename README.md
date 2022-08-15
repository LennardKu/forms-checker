# Password-Checker

## How to initialize
 	PasswordCheck(false,'{Field name}',{
 
   	button:'#sumbit_button',
   
   	Repeat:true,  
   
   	CapitalLength:2,
   
   	SpecialLength:0,
   
   	type:'tooltip',
   
 	},true)
	
	
To the password field you must add

 	password-checker="{Field name}" 
	Example: <input  password-checker="{Field name}" type="password" />

## initialize options

	Button          = Form button for disabling submit         

	Repeat          = Password verify field			    (Option: false or true)

	CapitalLength   = Minimal number of upper case letters      (Must be a number)

	SpecialLength   = Minimal number of special characters      (Must be a number)

	PasswordLength  = Minimal password length		    (Must be a number)

	LowerLength     = Minimal number of lower case letters      (Must be a number)

	NummbersLength  = Minimal number of numbers in password     (Must be a number)

	type            = The type of reporting   	    	    (Option: Tooltip or border)

	TooltipTitle =   Tooltip title text
	
	SimplePasswordChecker = Check password for common password (Option: true or false)
	
## Styling tooltip
	.password-check-tooltip       defines de tooltip wrapper
	.password-check-tooltip h3    defines de tooltip title
	.password-check-tooltip span  defines de tooltip text
	
## Language settings
	Setting Language 
	
	2 Language's available
	Dutch (Country code: Nl)
	English (Country code: En)
	How to set you're  language:
	
	<script src="{Location to you're script}" lang="{country code}"></script>
	
	

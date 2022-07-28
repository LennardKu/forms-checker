# Password-Checker

## How to initialize
 	PasswordCheck(false,'password',{
 
   	button:'#sumbit_button',
   
   	Repeat:true,  
   
   	CapitalLength:2,
   
   	SpecialLength:0,
   
   	type:'tooltip',
   
 	},true)

## initialize options

	Button          = Form button for disabling submit

	Repeat          = Password verify field

	CapitalLength   = Minimal number of upper case letters

	SpecialLength   = Minimal number of special characters

	PasswordLength  = Minimal password length

	LowerLength     = Minimal number of lower case letters

	NummbersLength  = Minimal number of numbers in password

	type            = The type of reporting (Tooltip or border)

	TooltipTitle = Tooltip title text
	
## Styling tooltip
	.password-check-tooltip       defines de tooltip wrapper
	.password-check-tooltip h3    defines de tooltip title
	.password-check-tooltip span  defines de tooltip text
	
## Language settings
	Setting Language 
	
	2 Language's available
	Dutch (Country code: Nl)
	English (Country code: En)
	How to set your language:
	
	<script src="{Location to yout script}" lang="{country code}"></script>
	
	

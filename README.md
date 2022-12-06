
# Forms validator

A brief description of what this project does and who it's for.

This script can be used to register users to you're site with valid credentials.

Please repport **bugs** or **vulnerabilities**





## Usage/Examples

To use this project download the checker script and place it in the head of you're site

```html
  <script src="${Location to the script}/checker.js"></script>
```

### Example

To use it on a form 

``` html
    <form id="YoureFormId">
        <input type="email">
        <input type="password">
        <input type="password" data-repeat-password="true">
        <button type="submit">Submit</button>
    </form>
```

``` javascript
new formChecker.config(
    document.getElementById('YoureFormId'),{
        'email-checker': true,
        'password-repeat': true,
        'button': true,
        'common-password':true,
    }
);
```

#### Or you can initialize all the elements at one

``` html
    <form data-form-checker>
        <input type="email">
        <input type="password">
        <input type="password" data-repeat-password="true">
        <button type="submit">Submit</button>
    </form>
```

``` javascript
new formChecker.init();
```

With this method you can set options with data attributes

#### example
``` html
    <form data-form-checker data-common-password="true" data-email-checker="true">
        <input type="email">
        <input type="password">
        <input type="password" data-repeat-password="true">
        <button type="submit">Submit</button>
    </form>
```

#### How to use each element.

 - Button: to use the button option create inside you're form a input or button element with the type **submit**
 - Email Checker: Create inside you're form a input field with the type **email**
 - Password repeat: Password repeat creates a repeat field. You can also assign youre own password repeat field. Create after you're password field a new password field with the *data attribute* **data-repeat-password** 
 
 ### Changing password requierments

-   4,
- capitalLetters: 2,
- lowerCaseLetters: 2,
- numbers: 2,
- specialCharacters: 2,


| Parameter | Type     | Default                       |
| :-------- | :------- | :-------------------------------- |
| `miniumPasswordLength`      | `number` | 4 |
| `capitalLetters`      | `number` | 2 |
| `lowerCaseLetters`      | `number` | 2 |
| `numbers`      | `number` | 2 |
| `specialCharacters`      | `number` | 2 |

### How to use
``` html
<script>
    formChecker.{Parameter} = {Number};
</script>
```

### Example
``` html
<script>
    formChecker.capitalLetters = 10;
</script>
```

## Tooltip options

You can change the text inside the tooltip 

**Default**
``` html
<script>
    formChecker.tooltipTitle = 'Password must contain';
    formChecker.tooltipNames = {'capitalLetters':'Capital letters','lowerCaseLetters': 'Lowercase letters', 'numbers': 'Numbers','specialCharacters': 'Special characters' };
</script>
```

**Example change in Dutch**
``` html
<script>
    formChecker.tooltipTitle = 'Wachtwoord moet volgende bevatten';
    formChecker.tooltipNames = {'capitalLetters':'Hoofdletters','lowerCaseLetters': 'Kleine letters', 'numbers': 'Nummers','specialCharacters': 'Speciale karakters' };
</script>
```

## Demo

[View demo here](https://demo.lennardkuenen.dev/posts/validator/)

## Authors

- [@LennardKu](https://www.github.com/LennardKu)


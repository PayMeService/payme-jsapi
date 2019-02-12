/**
 * Created by thoryachev on 22.11.2018.
 */
(function(document, mpl) {

  // Cache DOM Nodes ---------------------------------------------------------------------------------------------------

  const form = document.getElementById('checkout-form2');
  const submitButton = document.getElementById('submit-button2');

  const errorsMessages = document.getElementById('errors2');
  const backFormButton = document.querySelector('.back-on-form2');
  const successQuery = document.querySelector('.second-example .success');

  const numberGroup = document.getElementById('card-number-group2');
  const expirationGroup = document.getElementById('card-expiration-group2');
  const cvcGroup = document.getElementById('card-cvv-group2');

  const firstNameInput = document.getElementById('first-name-input2');
  const lastNameInput = document.getElementById('last-name-input2');
  const emailInput = document.getElementById('email-input2');
  const phoneInput = document.getElementById('phone-input2');
  const socialIdInput = document.getElementById('social-id-input2');

  const firstNameGroup = document.getElementById('first-name-group2');
  const lastNameGroup = document.getElementById('last-name-group2');
  const emailGroup = document.getElementById('email-group2');
  const phoneGroup = document.getElementById('phone-group2');
  const socialIdGroup = document.getElementById('social-id-group2');

  // Helpers -----------------------------------------------------------------------------------------------------------

  const errorsFromField = {};

  function tokenizationStarted() {
    form.classList.add('fadeOut');
    form.style.display = 'none';
    successQuery.style.display = 'block';
    successQuery.querySelector('.wrap-loading').style.display = 'block';
    successQuery.classList.add('fadeIn');
    submitButton.disabled = true;
    console.log('Tokenization started!');
  }

  function tokenizationFinished(error) {

    successQuery.querySelector('.wrap-loading').style.display = 'none';
    submitButton.disabled = false;
    console.log('Tokenization finished!');

    if(error) {
      console.error(error);

      const failedValidation = {
        field: PayMe.fields.NONE, isValid: false, message: ''
      };

      // Checking is tokenization processing error
      if(error.type && error.type === 'tokenize-error') {
        // Handle tokenization processing error
        const [ firstErrorMessage ] = Object.values(error.errors);
        failedValidation.message = firstErrorMessage;
      } else {
        // Handle other errors from PayMe
        failedValidation.message = error.message;
      }

      toggleNativeValidationMessages(failedValidation);
    } else {
      firstNameInput.value = lastNameInput.value = emailInput.value = phoneInput.value = socialIdInput.value = '';
    }
  }

  function showErrors() {

    errorsMessages.classList.remove('fadeOutDown');

    if (!errorsMessages.message) {
      errorsMessages.innerText = errorsFromField[Object.keys(errorsFromField).pop()];
    } else {
      errorsMessages.innerText = errorsMessages.message;
    }
  }

  function toggleValidationMessages(errorsContainer, ev) {
    if (ev.isValid) {

      errorsContainer.classList.remove('has-error');
      errorsContainer.classList.add('color-for-field');
      this.classList.remove('fadeInUp');
      this.classList.add('fadeOutDown');

      delete errorsFromField[ev.field]; // delete error from the object that passed validation
      if (Object.keys(errorsFromField).length > 0) { // if the object still has errors - output them
        showErrors();
        this.classList.remove('fadeOutDown');
        this.classList.add('fadeInUp');
      }
    } else {
      errorsFromField[ev.field] = ev.message; // write errors to the object
      errorsContainer.classList.add('has-error');
      errorsContainer.classList.remove('color-for-field');
      this.classList.remove('fadeOutDown');
      this.classList.add('fadeInUp');
      if (Object.keys(errorsFromField).length > 0) { // check if there is an error in the object
        showErrors(); // and show its
      }
    }
  }

  function toggleNativeValidationMessages(validationResult, wrapper) {

    delete errorsFromField[PayMe.fields.NONE];

    if (validationResult.isValid) {
      if(wrapper) {
        wrapper.classList.remove('has-error');
        wrapper.classList.add('color-for-field');
      }

      errorsMessages.classList.remove('fadeInUp');
      errorsMessages.classList.add('fadeOutDown');

      delete errorsFromField[validationResult.field]; // delete error from the object that passed validation
      if (Object.keys(errorsFromField).length > 0) { // if the object still has errors - output them
        showErrors();
        errorsMessages.classList.remove('fadeOutDown');
        errorsMessages.classList.add('fadeInUp');
      }
    } else {

      errorsFromField[validationResult.field] = validationResult.message; // write errors to the object

      if(wrapper) {
        wrapper.classList.add('has-error');
        wrapper.classList.remove('color-for-field');
      }

      errorsMessages.classList.remove('fadeOutDown');
      errorsMessages.classList.add('fadeInUp');
      if (Object.keys(errorsFromField).length > 0) { // check if there is an error in the object
        showErrors(); // and show its
      }
    }
  }

  function runNativeFieldValidator(value, field, messages) {
    const validator = PayMe.validators[field];
    const errors = validator.test(value);
    let message;
    if (errors && errors.required) {
      message = messages.required;
    }
    if (errors && errors.invalid) {
      message = messages.invalid;
    }

    return { isValid: !errors, field: field, message: message };
  }

  function createNativeFieldValidatorHandler(fieldName, messagesObject, fieldWrapper) {
    return function(ev) {
      const inputNode = this;
      const validation = runNativeFieldValidator(ev.target.value, fieldName, messagesObject);

      if (validation.isValid) {
        inputNode.classList.remove('invalid');
        inputNode.classList.add('valid');
      } else {
        inputNode.classList.remove('valid');
        inputNode.classList.add('invalid');
      }

      toggleNativeValidationMessages(validation, fieldWrapper);
    };
  }

  function addClass(fieldId, className) {
    document.getElementById(fieldId).classList.add(className);
  }

  function removeClassIfNeeded(fieldId, className, ev) {
    if (ev.target.value === '') {
      document.getElementById(fieldId).classList.remove(className);
    }
  }

  function removeClass(fieldId, className, fieldOptions) {
    if (fieldOptions.getState().isEmpty) {
      document.getElementById(fieldId).classList.remove(className);
    }
  }

  function showSuccessQuery(data) {
    successQuery.querySelector('.name').innerHTML = '<span>Name:</span> ' + data.payerName;
    successQuery.querySelector('.email').innerHTML = '<span>Email:</span> ' + data.payerEmail;
    successQuery.querySelector('.phone').innerHTML = '<span>Phone:</span> ' + data.payerPhone;
    successQuery.querySelector('.socialId').innerHTML = '<span>Social Id:</span> ' + data.payerSocialId;
    successQuery.querySelector('.token').innerHTML = '<span>Token:</span> ' + data.token;
  }

  // Misc --------------------------------------------------------------------------------------------------------------

  const allFieldsReady = [];

  const DEFAULT_SETTINGS = {
    styles: {
      base: {
        'color': '#565B7D',
        'font-size': '16px',
        '::placeholder': { 'color': '#8FA7C8' },
      },
      invalid: {
        'color': '#fff',
      },
      valid: {
        'color': '#565B7D',
      },
    },
  };

  // Main --------------------------------------------------------------------------------------------------------------

  function init() {
    // Disable submit button until protected fields initialization
    submitButton.disabled = true;

    // Getting hosted fields integration manager
    PayMe.create(mpl, { testMode: true }).then((instance) => {

      const fields = instance.hostedFields();

      // Protected fields ------------------------------------------------------

      // Card Number
      const cardNumberSettings = Object.assign({}, DEFAULT_SETTINGS, {
        placeholder: '1234 1234 1234 1234',
        messages: {
          invalid: 'Bad credit card number',
          required: 'Field "Card Number" is mandatory',
        },
      });
      const cardNumber = fields.create(PayMe.fields.NUMBER, cardNumberSettings);
      allFieldsReady.push(
        cardNumber.mount('#card-number-container2'),
      );
      cardNumber.on('keyup', toggleValidationMessages.bind(errorsMessages, numberGroup));
      cardNumber.on('blur', () => removeClass('card-number-container2', 'focus-on-field', cardNumber));
      cardNumber.on('focus', () => addClass('card-number-container2', 'focus-on-field'));

      // Expiry Date
      const expirationField = Object.assign({}, DEFAULT_SETTINGS, {
        messages: {
          invalid: 'Invalid Expiration',
          required: 'Field "Expiration" is mandatory',
        },
      });
      const expiration = fields.create(PayMe.fields.EXPIRATION, expirationField);
      allFieldsReady.push(
        expiration.mount('#card-expiration-container2'),
      );
      expiration.on('keyup', toggleValidationMessages.bind(errorsMessages, expirationGroup));
      expiration.on('validity-changed', toggleValidationMessages.bind(errorsMessages, expirationGroup));
      expiration.on('blur', () => removeClass('card-expiration-container2', 'focus-on-field', expiration));
      expiration.on('focus', () => addClass('card-expiration-container2', 'focus-on-field'));

      // CVC/CVV
      const cvcField = Object.assign({}, DEFAULT_SETTINGS, {
        placeholder: 'CVC',
        messages: {
          invalid: 'Invalid CVC',
          required: 'Field "CVC" is mandatory',
        },
      });
      const cvc = fields.create(PayMe.fields.CVC, cvcField);
      allFieldsReady.push(
        cvc.mount('#card-cvv-container2'),
      );
      cvc.on('keyup', toggleValidationMessages.bind(errorsMessages, cvcGroup));
      cvc.on('validity-changed', toggleValidationMessages.bind(errorsMessages, cvcGroup));
      cvc.on('blur', () => removeClass('card-cvv-container2', 'focus-on-field', cvc));
      cvc.on('focus', () => addClass('card-cvv-container2', 'focus-on-field'));

      // Protected fields ------------------------------------------------------

      // First Name
      const firstNameMessages = {
        invalid: 'Letters only for field "First name"', required: 'Field "First name" is mandatory',
      };
      firstNameInput.addEventListener(
        'keyup', createNativeFieldValidatorHandler(PayMe.fields.NAME_FIRST, firstNameMessages, firstNameGroup),
      );
      firstNameInput.addEventListener('blur', removeClassIfNeeded.bind(null, 'first-name-container2', 'focus-on-field'));
      firstNameInput.addEventListener('focus', () => addClass('first-name-container2', 'focus-on-field'));

      // Last Name
      const lastNameMessages = {
        invalid: 'Letters only for field "Last name"', required: 'Field "Last name" is mandatory',
      };
      lastNameInput.addEventListener(
        'keyup', createNativeFieldValidatorHandler(PayMe.fields.NAME_LAST, lastNameMessages, lastNameGroup),
      );
      lastNameInput.addEventListener('blur', removeClassIfNeeded.bind(null, 'last-name-container2', 'focus-on-field'));
      lastNameInput.addEventListener('focus', () => addClass('last-name-container2', 'focus-on-field'));

      // Email
      const emailMessages = {
        invalid: 'Invalid Email', required: 'Field "Email" is mandatory',
      };
      emailInput.addEventListener(
        'keyup', createNativeFieldValidatorHandler(PayMe.fields.EMAIL, emailMessages, emailGroup),
      );
      emailInput.addEventListener('blur', removeClassIfNeeded.bind(null, 'email-container2', 'focus-on-field'));
      emailInput.addEventListener('focus', () => addClass('email-container2', 'focus-on-field'));

      // Phone Number
      const phoneMessages = {
        invalid: 'Invalid Phone', required: 'Field "Phone" is mandatory',
      };
      phoneInput.addEventListener(
        'keyup', createNativeFieldValidatorHandler(PayMe.fields.PHONE, phoneMessages, phoneGroup),
      );
      phoneInput.addEventListener('blur', removeClassIfNeeded.bind(null, 'phone-container2', 'focus-on-field'));
      phoneInput.addEventListener('focus', () => addClass('phone-container2', 'focus-on-field'));

      // Social Id
      const socialIdMessages = {
        invalid: 'Invalid Phone', required: 'Field "Social Id" is mandatory',
      };
      socialIdInput.addEventListener(
        'keyup', createNativeFieldValidatorHandler(PayMe.fields.SOCIAL_ID, socialIdMessages, socialIdGroup),
      );
      socialIdInput.addEventListener('blur', removeClassIfNeeded.bind(null, 'social-id-container2', 'focus-on-field'));
      socialIdInput.addEventListener('focus', () => addClass('social-id-container2', 'focus-on-field'));

      // Wait for fields initialization ----------------------------------------

      Promise.all(allFieldsReady).then(() => submitButton.disabled = false);

      // Form submission handler -----------------------------------------------

      const formSubmit = ev => {
        ev.preventDefault();

        const sale = {

          payerFirstName: firstNameInput.value,
          payerLastName: lastNameInput.value,
          payerEmail: emailInput.value,
          payerPhone: phoneInput.value,
          payerSocialId: socialIdInput.value,

          total: {
            label: '🚀 Rubber duck',
            amount: {
              currency: 'ILS',
              value: '55.00',
            },
          },
        };


        tokenizationStarted();

        instance.tokenize(sale)
          .then(data => {
            console.log('Tokenization result::: ', data);

            showSuccessQuery(data);

            tokenizationFinished();
          })
          .catch(err => {

            alert('Tokenization failed');
            successQuery.style.display = 'none';
            form.style.display = 'block';
            form.classList.remove('fadeOut');

            tokenizationFinished(err);
          });
      };

      // Return and recreate handler -------------------------------------------

      const clickToBackOnForm = () => {
        successQuery.style.display = 'none';

        instance.teardown();

        form.removeEventListener('submit', formSubmit);
        backFormButton.removeEventListener('click', clickToBackOnForm);

        form.classList.remove('fadeOut');
        form.classList.add('fadeIn');
        document.querySelectorAll('.second-example .focus-on-field').forEach(el => {
          el.classList.remove('focus-on-field');
        });
        form.style.display = 'block';
        init();
      };

      // Events binding --------------------------------------------------------

      form.addEventListener('submit', formSubmit);
      backFormButton.addEventListener('click', clickToBackOnForm);

    });
  }

  init();

})(document, 'MPL15282-97137EVV-KOAOAOIT-VWCZPB8V');

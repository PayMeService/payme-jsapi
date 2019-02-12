/**
 * Created by thoryachev on 22.11.2018.
 */
(function(document, mpl) {

  // Cache DOM Nodes ---------------------------------------------------------------------------------------------------

  const form = document.getElementById('checkout-form3');
  const submitButton = document.getElementById('submit-button3');

  const errorsMessages = document.getElementById('errors3');
  const backFormButton = document.querySelector('.back-on-form3');
  const successQuery = document.querySelector('.third-example .success');

  const numberGroup = document.getElementById('card-number-group3');
  const expirationGroup = document.getElementById('card-expiration-group3');
  const cvcGroup = document.getElementById('card-cvv-group3');

  const firstNameInput = document.getElementById('first-name-input3');
  const lastNameInput = document.getElementById('last-name-input3');
  const emailInput = document.getElementById('email-input3');
  const phoneInput = document.getElementById('phone-input3');
  const socialIdInput = document.getElementById('social-id-input3');

  const firstNameGroup = document.getElementById('first-name-group3');
  const lastNameGroup = document.getElementById('last-name-group3');
  const emailGroup = document.getElementById('email-group3');
  const phoneGroup = document.getElementById('phone-group3');
  const socialIdGroup = document.getElementById('social-id-group3');

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

      toggleValidationMessages(null, failedValidation);
    } else {
      firstNameInput.value = lastNameInput.value = emailInput.value = phoneInput.value = socialIdInput.value = '';
    }
  }


  function showErrors(errorsFromField, el, ev) {
    let lastElement = errorsFromField[Object.keys(errorsFromField).pop()];
    el.classList.remove('fadeOutDown');
    if (!ev.message) {
      el.innerText = lastElement;
    } else {
      el.innerText = ev.message;
    }
  }

  function toggleValidationMessages(wrapper, validationState) {
    if (validationState.isValid) {

      if(wrapper) {
        wrapper.classList.remove('has-error');
      }

      errorsMessages.classList.remove('fadeInUp');
      errorsMessages.classList.add('fadeOutDown');

      delete errorsFromField[validationState.field]; // delete error from the object that passed validation
      if (Object.keys(errorsFromField).length > 0) { // if the object still has errors - output them
        showErrors(errorsFromField, errorsMessages, validationState);
        errorsMessages.classList.remove('fadeOutDown');
        errorsMessages.classList.add('fadeInUp');
      }
    } else {
      errorsFromField[validationState.field] = validationState.message; // write errors to the object

      if(wrapper) {
        wrapper.classList.add('has-error');
      }

      errorsMessages.classList.remove('fadeOutDown');
      errorsMessages.classList.add('fadeInUp');
      if (Object.keys(errorsFromField).length > 0) { // check if there is an error in the object
        showErrors(errorsFromField, errorsMessages, validationState); // and show its
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

      toggleValidationMessages(fieldWrapper, validation);
    };
  }

  function unfocusFields(currentField, elemId) {
    document.querySelectorAll('.third-example label').forEach((el, index) => {
      if (currentField.getState().isEmpty && el.getAttribute('for') === elemId) {
        el.classList.remove('animated-label');
      }
    });
  }

  function unfocusInput(value, elemId) {
    document.querySelectorAll('.third-example label').forEach((el, index) => {
      if (!value && el.getAttribute('for') === elemId) {
        el.classList.remove('animated-label');
      }
    });
  }

  function focusOnField(elemId) {
    document.querySelector('label[for=' + elemId + ']').classList.add('animated-label');
  }

  function queryLabelFor(elemId) {
    return document.querySelector('label[for=' + elemId + ']');
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
        'font-size': '16px',
        'color': '#000',
      },
      invalid: {
        'color': '#FF0000',
      },
      valid: {
        'color': '#000',
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
        placeholder: ' ',
        messages: {
          invalid: 'Bad credit card number', required: 'Field "Card Number" is mandatory',
        },
      });
      const cardNumber = fields.create(PayMe.fields.NUMBER, cardNumberSettings);
      allFieldsReady.push(
        cardNumber.mount('#card-number-container3'),
      );
      cardNumber.on('keyup', state => toggleValidationMessages(numberGroup, state));
      cardNumber.on('validity-changed', state => toggleValidationMessages(numberGroup, state));
      cardNumber.on('focus', () => focusOnField('card-number-container3'));
      cardNumber.on('blur', () => unfocusFields(cardNumber, 'card-number-container3'));

      // Expiry Date
      const expirationField = Object.assign({}, DEFAULT_SETTINGS, {
        placeholder: ' ',
        messages: {
          invalid: 'Invalid Expiration', required: 'Field "Expiration" is mandatory',
        },
      });
      const expiration = fields.create(PayMe.fields.EXPIRATION, expirationField);
      allFieldsReady.push(
        expiration.mount('#card-expiration-container3'),
      );
      expiration.on('keyup', state => toggleValidationMessages(expirationGroup, state));
      expiration.on('validity-changed', state => toggleValidationMessages(expirationGroup, state));
      expiration.on('focus', () => focusOnField('card-expiration-container3'));
      expiration.on('blur', () => unfocusFields(expiration, 'card-expiration-container3'));

      // CVC/CVV
      const cvcField = Object.assign({}, DEFAULT_SETTINGS, {
        placeholder: ' ',
        messages: {
          invalid: 'Invalid CVC', required: 'Field "CVC" is mandatory',
        },
      });
      const cvc = fields.create(PayMe.fields.CVC, cvcField);
      allFieldsReady.push(
        cvc.mount('#card-cvv-container3'),
      );
      cvc.on('keyup', state => toggleValidationMessages(cvcGroup, state));
      cvc.on('validity-changed', state => toggleValidationMessages(cvcGroup, state));
      cvc.on('focus', () => focusOnField('card-cvv-container3'));
      cvc.on('blur', () => unfocusFields(cvc, 'card-cvv-container3'));

      // Protected fields ------------------------------------------------------

      // First Name
      const firstNameMessages = {
        invalid: 'Letters only for field "First name"', required: 'Field "First name" is mandatory',
      };
      firstNameInput.addEventListener(
        'keyup', createNativeFieldValidatorHandler(PayMe.fields.NAME_FIRST, firstNameMessages, firstNameGroup),
      );
      firstNameInput.addEventListener('focus', () => focusOnField('first-name-input3'));
      firstNameInput.addEventListener('blur', ev => unfocusInput(ev.target.value, 'first-name-input3'));

      // Last Name
      const lastNameMessages = {
        invalid: 'Letters only for field "Last name"', required: 'Field "Last name" is mandatory',
      };
      lastNameInput.addEventListener(
        'keyup', createNativeFieldValidatorHandler(PayMe.fields.NAME_LAST, lastNameMessages, lastNameGroup),
      );
      lastNameInput.addEventListener('focus', () => focusOnField('last-name-input3'));
      lastNameInput.addEventListener('blur', ev => unfocusInput(ev.target.value, 'last-name-input3'));

      // Email
      const emailFieldMessages = {
        invalid: 'Invalid Email', required: 'Field "Email" is mandatory',
      };
      emailInput.addEventListener(
        'keyup', createNativeFieldValidatorHandler(PayMe.fields.EMAIL, emailFieldMessages, emailGroup),
      );
      emailInput.addEventListener('focus', () => focusOnField('email-input3'));
      emailInput.addEventListener('blur', ev => unfocusInput(ev.target.value, 'email-input3'));

      // Phone Number
      const phoneFieldMessages = {
        invalid: 'Invalid Phone', required: 'Field "Phone" is mandatory',
      };
      phoneInput.addEventListener(
        'keyup', createNativeFieldValidatorHandler(PayMe.fields.PHONE, phoneFieldMessages, phoneGroup),
      );
      phoneInput.addEventListener('focus', () => focusOnField('phone-input3'));
      phoneInput.addEventListener('blur', ev => unfocusInput(ev.target.value, 'phone-input3'));

      // Social Id
      const socialIdFieldMessages = {
        invalid: 'Invalid Phone', required: 'Field "Social Id" is mandatory',
      };
      socialIdInput.addEventListener(
        'keyup', createNativeFieldValidatorHandler(PayMe.fields.SOCIAL_ID, socialIdFieldMessages, socialIdGroup),
      );
      socialIdInput.addEventListener('focus', () => focusOnField('social-id-input3'));
      socialIdInput.addEventListener('blur', ev => unfocusInput(ev.target.value, 'social-id-input3'));

      // Cache for click handlers ----------------------------------------------

      const cardNumberLabelClick = () => cardNumber.focus();
      const cardExpirationLabelClick = () => expiration.focus();
      const cardCVVLabelClick = () => cvc.focus();
      const firstNameLabelClick = () => firstNameInput.focus();
      const lastNameLabelClick = () => lastNameInput.focus();
      const phoneLabelClick = () => phoneInput.focus();
      const emailLabelClick = () => emailInput.focus();
      const socialLabelClick = () => socialIdInput.focus();

      // Bind click handlers ---------------------------------------------------

      queryLabelFor('card-number-container3').addEventListener('click', cardNumberLabelClick);
      queryLabelFor('card-expiration-container3').addEventListener('click', cardExpirationLabelClick);
      queryLabelFor('card-cvv-container3').addEventListener('click', cardCVVLabelClick);

      queryLabelFor('first-name-input3').addEventListener('click', firstNameLabelClick);
      queryLabelFor('last-name-input3').addEventListener('click', lastNameLabelClick);
      queryLabelFor('phone-input3').addEventListener('click', phoneLabelClick);
      queryLabelFor('email-input3').addEventListener('click', emailLabelClick);
      queryLabelFor('social-id-input3').addEventListener('click', socialLabelClick);

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

        // General clean up -----------------------------------------

        queryLabelFor('card-number-container3').removeEventListener('click', cardNumberLabelClick);
        queryLabelFor('card-expiration-container3').removeEventListener('click', cardExpirationLabelClick);
        queryLabelFor('card-cvv-container3').removeEventListener('click', cardCVVLabelClick);

        queryLabelFor('first-name-input3').removeEventListener('click', firstNameLabelClick);
        queryLabelFor('last-name-input3').removeEventListener('click', lastNameLabelClick);
        queryLabelFor('phone-input3').removeEventListener('click', phoneLabelClick);
        queryLabelFor('email-input3').removeEventListener('click', emailLabelClick);
        queryLabelFor('social-id-input3').removeEventListener('click', socialLabelClick);

        form.classList.remove('fadeOut');
        form.classList.add('fadeIn');
        form.style.display = 'block';

        document.querySelectorAll('.animated-label').forEach(el => {
          el.classList.remove('animated-label');
        });

        init();
      };

      form.addEventListener('submit', formSubmit);
      backFormButton.addEventListener('click', clickToBackOnForm);

    });
  }

  init();

})(document, 'MPL15282-97137EVV-KOAOAOIT-VWCZPB8V');

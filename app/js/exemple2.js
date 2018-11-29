/**
 * Created by thoryachev on 22.11.2018.
 */
// HELPERS ---------------------------------------------------------------------------------
(function (global) {
  const mpl2 = 'MPL15282-97137EVV-KOAOAOIT-VWCZPB8V';

  const consolePre2 = document.getElementById('console-pre2');
  const form = document.getElementById('checkout-form');

  const errorsMessages2 = document.getElementById('errors2');

  const numberGroup2 = document.getElementById('card-number-group2');
// const numberMessages2 = document.getElementById('card-number-messages2');

  const expirationGroup2 = document.getElementById('card-expiration-group2');
// const expirationMessages2 = document.getElementById('card-expiration-messages2');

  const cvcGroup2 = document.getElementById('card-cvv-group2');
// const cvcMessages2 = document.getElementById('card-cvv-messages2');

  const firstNameGroup2 = document.getElementById('first-name-group2');
// const firstNameMessages2 = document.getElementById('first-name-messages2');

  const lastNameGroup2 = document.getElementById('last-name-group2');
// const lastNameMessages2 = document.getElementById('last-name-messages2');

  const emailGroup2 = document.getElementById('email-group2');
// const emailMessages2 = document.getElementById('email-messages2');

  const phoneGroup2 = document.getElementById('phone-group2');
// const phoneMessages2 = document.getElementById('phone-messages2');

  const socialIdGroup2 = document.getElementById('social-id-group2');
// const socialIdMessages2 = document.getElementById('social-id-messages2');


// -----------------------------------------------------------------------------------------------------------------

  const submitButton2 = document.getElementById('submit-button2');
  submitButton2.disabled = true;

  function tokenizationStarted() {
    submitButton2.disabled = true;
    console.log('Tokenization started!');
  }

  function tokenizationFinished() {
    submitButton2.disabled = false;
    console.log('Tokenization finished!');
  }

  const errorsFromField2 = {};

  function showErrors2(errorsFromField, el, ev) {
    console.log(el);
    // var length = Object.keys(errorsFromField).length;
    var highest = errorsFromField[Object.keys(errorsFromField).sort().pop()];
    el.classList.remove('fadeOutDown');
    // el.classList.remove('fadeInUp');
    console.log(ev.message);
    if (!ev.message) {
      el.innerText = highest;
    } else {
      el.innerText = ev.message;
    }
  }

  function toggleValidationMessages(wrapper, ev) {
    console.log(errorsFromField2);
    console.log(ev);
    if (ev.isValid) {
      wrapper.classList.remove('has-error');
      this.classList.remove('fadeInUp');
      this.classList.add('fadeOutDown');
      delete errorsFromField2[ev.field]; // УДАЛЯЕМ КОНкретный эллемент из объекта который прошел валидацию

      if (Object.keys(errorsFromField2).length > 0) { // если в объекте еще остались ошибки выводим их
        showErrors2(errorsFromField2, this, ev);
        this.classList.remove('fadeOutDown');
        this.classList.add('fadeInUp');
      }
    } else {
      errorsFromField2[ev.field] = ev.message; //ЗАПИСЫВАЕМ ошибки в объект
      wrapper.classList.add('has-error');
      console.log(wrapper);
      this.classList.remove('fadeOutDown');
      this.classList.add('fadeInUp');
      if (Object.keys(errorsFromField2).length > 0) { //проверяем есть ли в обьекте еще какие то элементы
        showErrors2(errorsFromField2, this, ev); // и показываем их
      }
    }
  }

// function changeCardProviderIcon(cardVendor) {
//
//     const vendorsToClasses = {
//         'unknown': ['fas', 'fa-credit-card'],
//
//         'amex': ['fab', 'fa-cc-amex'],
//         'diners': ['fab', 'fa-cc-diners-club'],
//         'jcb': ['fab', 'fa-cc-jcb'],
//         'visa': ['fab', 'fa-cc-visa'],
//         'mastercard': ['fab', 'fa-cc-mastercard'],
//         'discover': ['fab', 'fa-cc-discover'],
//     };
//
//     cardProvider2.classList.remove(...cardProvider2.classList);
//     cardProvider2.classList.add(...(vendorsToClasses[cardVendor] ? vendorsToClasses[cardVendor] : vendorsToClasses['unknown']));
// }

// -----------------------------------------------------------------------------------------------------------------

  const allFieldsReady = [];

  const DEFAULT_SETTINGS = {
    styles: {
      base: {
        'color': '#565B7D',
        'font-size': '16px',
        '::placeholder': {'color': '#8FA7C8'}
      },
      invalid: {
        'color': '#fff'
      },
      valid: {
        'color': '#565B7D',
      },
    }
  };



  PayMe.create(mpl2, {
    testMode: true
  }).then((instance) => {

    const fields2 = instance.hostedFields();

    const cardNumberSettings2 = {
      placeholder: '1234 1234 1234 1234',
      messages: {invalid: 'Bad credit card number'},
      ...DEFAULT_SETTINGS,
    };
    const firstNameField2 = {
      ...DEFAULT_SETTINGS,
      placeholder: 'First name',
      // messages: { invalid: 'Bad credit card number' },
    };

    const lastNameField2 = {
      ...DEFAULT_SETTINGS,
      placeholder: 'Last name',
      // messages: { invalid: 'Bad credit card number' },
    };

    const emailField2 = {
      ...DEFAULT_SETTINGS,
      placeholder: 'Email',
      // messages: { invalid: 'Bad credit card number' },
    };

    const phoneField2 = {
      ...DEFAULT_SETTINGS,
      placeholder: 'Phone',
      // messages: { invalid: 'Bad credit card number' },
    };

    const socialIdField2 = {
      ...DEFAULT_SETTINGS,
      placeholder: 'Social ID',
      // messages: { invalid: 'Bad credit card number' },
    };
    const cvcField2 = {
      placeholder: 'CVC',
      // messages: { invalid: 'Bad credit card number' },
      styles: {
        base: {
          'color': '#565B7D',
          'font-size': '16px',
          '::placeholder': {'color': '#8FA7C8'}
        },
        invalid: {
          'color': '#fff'
        },
        valid: {
          'color': '#565B7D',
        },
      }
    };
    const expirationField2 = {
      // placeholder: 'CVC',
      // messages: { invalid: 'Bad credit card number' },
      styles: {
        base: {
          'color': '#565B7D',
          'font-size': '16px',
          '::placeholder': {'color': '#8FA7C8'}
        },
        invalid: {
          'color': '#fff'
        },
        valid: {
          'color': '#565B7D',
        },

      }
    };
    const cardNumber2 = fields2.create(PayMe.fields.NUMBER, cardNumberSettings2);
    allFieldsReady.push(
      cardNumber2.mount('#card-number-container2')
    );
    // cardNumber2.on('card-type-changed', ev => changeCardProviderIcon(ev.cardType));
    cardNumber2.on('keyup', toggleValidationMessages.bind(errorsMessages2, numberGroup2));

    cardNumber2.on('change', console.log);
    cardNumber2.on('blur', function () {
      document.getElementById('card-number-container2').classList.remove('focus-on-field');
    });
    cardNumber2.on('focus', function () {
      document.getElementById('card-number-container2').classList.add('focus-on-field');
    });
    cardNumber2.on('keyup', function () {
    });
    cardNumber2.on('keydown', function () {
    });
    cardNumber2.on('keypress', console.log);
    cardNumber2.on('validity-changed', console.log);
    cardNumber2.on('card-type-changed', console.log);

    const expiration = fields2.create(PayMe.fields.EXPIRATION, expirationField2);
    allFieldsReady.push(
      expiration.mount('#card-expiration-container2')
    );
    expiration.on('keyup', toggleValidationMessages.bind(errorsMessages2, expirationGroup2));
    expiration.on('validity-changed', toggleValidationMessages.bind(errorsMessages2, expirationGroup2));
    expiration.on('blur', function () {
      document.getElementById('card-expiration-container2').classList.remove('focus-on-field')
    });
    expiration.on('focus', function () {
      document.getElementById('card-expiration-container2').classList.add('focus-on-field')
    });

    const cvc = fields2.create(PayMe.fields.CVC, cvcField2);
    allFieldsReady.push(
      cvc.mount('#card-cvv-container2')
    );
    cvc.on('keyup', toggleValidationMessages.bind(errorsMessages2, cvcGroup2));
    cvc.on('validity-changed', toggleValidationMessages.bind(errorsMessages2, cvcGroup2));
    cvc.on('blur', function () {
      document.getElementById('card-cvv-container2').classList.remove('focus-on-field')
    });
    cvc.on('focus', function () {
      document.getElementById('card-cvv-container2').classList.add('focus-on-field')
    });

    const phone = fields2.create(PayMe.fields.PHONE, phoneField2);
    allFieldsReady.push(
      phone.mount('#phone-container2')
    );
    phone.on('keyup', toggleValidationMessages.bind(errorsMessages2, phoneGroup2));
    phone.on('validity-changed', toggleValidationMessages.bind(errorsMessages2, phoneGroup2));
    phone.on('blur', function () {
      document.getElementById('phone-container2').classList.remove('focus-on-field')
    });
    phone.on('focus', function () {
      document.getElementById('phone-container2').classList.add('focus-on-field')
    });

    const email = fields2.create(PayMe.fields.EMAIL, emailField2);
    allFieldsReady.push(
      email.mount('#email-container2')
    );
    email.on('keyup', toggleValidationMessages.bind(errorsMessages2, emailGroup2));
    email.on('validity-changed', toggleValidationMessages.bind(errorsMessages2, emailGroup2));
    email.on('blur', function () {
      document.getElementById('email-container2').classList.remove('focus-on-field')
    });
    email.on('focus', function () {
      document.getElementById('email-container2').classList.add('focus-on-field')
    });

    const firstName = fields2.create(PayMe.fields.NAME_FIRST, firstNameField2);
    allFieldsReady.push(
      firstName.mount('#first-name-container2')
    );
    firstName.on('keyup', toggleValidationMessages.bind(errorsMessages2, firstNameGroup2));
    firstName.on('validity-changed', toggleValidationMessages.bind(errorsMessages2, firstNameGroup2));
    firstName.on('blur', function () {
      document.getElementById('first-name-container2').classList.remove('focus-on-field')
    });
    firstName.on('focus', function () {
      document.getElementById('first-name-container2').classList.add('focus-on-field')
    });

    const lastName = fields2.create(PayMe.fields.NAME_LAST, lastNameField2);
    allFieldsReady.push(
      lastName.mount('#last-name-container2')
    );
    lastName.on('keyup', toggleValidationMessages.bind(errorsMessages2, lastNameGroup2));
    lastName.on('validity-changed', toggleValidationMessages.bind(errorsMessages2, lastNameGroup2));
    lastName.on('blur', function () {
      document.getElementById('last-name-container2').classList.remove('focus-on-field')
    });
    lastName.on('focus', function () {
      document.getElementById('last-name-container2').classList.add('focus-on-field')
    });

    const socialId = fields2.create(PayMe.fields.SOCIAL_ID, socialIdField2);
    allFieldsReady.push(
      socialId.mount('#social-id-container2')
    );
    socialId.on('keyup', toggleValidationMessages.bind(errorsMessages2, socialIdGroup2));
    socialId.on('validity-changed', toggleValidationMessages.bind(errorsMessages2, socialIdGroup2));
    socialId.on('blur', () => document.getElementById('social-id-container2').classList.remove('focus-on-field'));
    socialId.on('focus', function () {
      document.getElementById('social-id-container2').classList.add('focus-on-field')
    });

    Promise.all(allFieldsReady).then(() => submitButton2.disabled = false);

    form.addEventListener('submit', ev => {
      ev.preventDefault();

      const sale = {

        // payerFirstName: 'Vladimir',
        // payerLastName: 'kondratiev',
        // payerEmail: 'trahomoto@mailforspam.com',
        // payerPhone: '1231231',

        payerSocialId: '65656',

        total: {
          label: '🚀 Rubber duck',
          amount: {
            currency: 'ILS',
            value: '55.00',
          }
        }
      };


      tokenizationStarted();

      instance.tokenize(sale)
        .then(data => {
          console.log('Tokenization result::: ', data);
          consolePre2.innerText = 'Tokenization result::: \r\n';
          consolePre2.innerText = consolePre2.innerText + JSON.stringify(data, null, 2);

          tokenizationFinished();
        })
        .catch(err => {
          console.error(err);

          tokenizationFinished();
        });
    });

//document.getElementById('tear-down').addEventListener('click', () => instance.teardown());

  });


})(window);



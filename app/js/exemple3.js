/**
 * Created by thoryachev on 22.11.2018.
 */
// HELPERS ---------------------------------------------------------------------------------

(function () {
    const mpl = 'MPL15282-97137EVV-KOAOAOIT-VWCZPB8V';

    const form = document.getElementById('checkout-form3');
    const errorsMessages = document.getElementById('errors3');
    const numberGroup = document.getElementById('card-number-group3');
    const expirationGroup = document.getElementById('card-expiration-group3');
    const cvcGroup = document.getElementById('card-cvv-group3');
    const firstNameGroup = document.getElementById('first-name-group3');
    const lastNameroup = document.getElementById('last-name-group3');
    const emailGroup = document.getElementById('email-group3');
    const phoneGroup = document.getElementById('phone-group3');
    const socialIdGroup = document.getElementById('social-id-group3');
    const submitButton = document.getElementById('submit-button3');
    const successQuery = document.querySelector('.third-example .success');
    const backFormButton = document.querySelector('.back-on-form3');

    submitButton.disabled = true;

    function tokenizationStarted() {
        form.classList.add('fadeOut');
        form.style.display = 'none';
        successQuery.style.display = 'block';
        successQuery.querySelector('.wrap-loading').style.display = 'block';
        successQuery.classList.add('fadeIn');
        submitButton.disabled = true;
        console.log('Tokenization started!');
    }

    function tokenizationFinished() {
        successQuery.querySelector('.wrap-loading').style.display = 'none';
        submitButton.disabled = false;
        console.log('Tokenization finished!');
    }

    const errorsFromField = {};


    function showErrors(errorsFromField, el, ev) {
        let lastElement = errorsFromField[Object.keys(errorsFromField).pop()];
        el.classList.remove('fadeOutDown');
        if (!ev.message) {
            el.innerText = lastElement;
        } else {
            el.innerText = ev.message;
        }
    }

    function toggleValidationMessages(wrapper, ev) {
        if (ev.isValid) {
            wrapper.classList.remove('has-error');
            this.classList.remove('fadeInUp');
            this.classList.add('fadeOutDown');
            delete errorsFromField[ev.field]; // delete error from the object that passed validation
            if (Object.keys(errorsFromField).length > 0) { // if the object still has errors - output them
                showErrors(errorsFromField, this, ev);
                this.classList.remove('fadeOutDown');
                this.classList.add('fadeInUp');
            }
        } else {
            errorsFromField[ev.field] = ev.message; // write errors to the object
            wrapper.classList.add('has-error');
            this.classList.remove('fadeOutDown');
            this.classList.add('fadeInUp');
            if (Object.keys(errorsFromField).length > 0) { // check if there is an error in the object
                showErrors(errorsFromField, this, ev); // and show its
            }
        }
    }

    function unfocusFields(currentField, elemId) {
        document.querySelectorAll('.third-example label').forEach((el, index) => {
            if (currentField.getState().isEmpty && el.getAttribute('for') === elemId) {
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
        successQuery.querySelector('.name').innerHTML = "<span>Name:</span> " + data.payerName;
        successQuery.querySelector('.email').innerHTML = "<span>Email:</span> " + data.payerEmail;
        successQuery.querySelector('.phone').innerHTML = "<span>Phone:</span> " + data.payerPhone;
        successQuery.querySelector('.socialId').innerHTML = "<span>Social Id:</span> " + data.payerSocialId;
        successQuery.querySelector('.token').innerHTML = "<span>Token:</span> " + data.token;
    }

// -----------------------------------------------------------------------------------------------------------------

    const allFieldsReady = [];

    const DEFAULT_SETTINGS = {
        styles: {
            base: {
                'font-size': '16px',
                'color': '#000'
            },
            invalid: {
                'color': '#FF0000'
            },
            valid: {
                'color': '#000'
            }
        }
    };

    function init() {
        PayMe.create(mpl, {
            testMode: true
        }).then((instance) => {

            const fields = instance.hostedFields();

            const cardNumberSettings = {
                ...DEFAULT_SETTINGS,
                placeholder: ' ',
                messages: {
                    invalid: 'Bad credit card number',
                    required: 'Field "Card Number" is mandatory'
                },
            };
            const firstNameField = {
                ...DEFAULT_SETTINGS,
                placeholder: ' ',
                messages: {
                    invalid: 'Letters only for field "First name"',
                    required: 'Field "First name" is mandatory'
                },
            };

            const lastNamefield = {
                ...DEFAULT_SETTINGS,
                placeholder: ' ',
                messages: {
                    invalid: 'Letters only for field "Last name"',
                    required: 'Field "Last name" is mandatory'
                },
            };

            const emailField = {
                ...DEFAULT_SETTINGS,
                placeholder: ' ',
                messages: {
                    invalid: 'Invalid Email',
                    required: 'Field "Email" is mandatory'
                },
            };

            const phoneField = {
                ...DEFAULT_SETTINGS,
                placeholder: ' ',
                messages: {
                    invalid: 'Invalid Phone',
                    required: 'Field "Phone" is mandatory'
                },
            };

            const socialIdField = {
                ...DEFAULT_SETTINGS,
                placeholder: ' ',
                messages: {
                    invalid: 'Invalid Phone',
                    required: 'Field "Social Id" is mandatory'
                },

            };
            const cvcField = {
                ...DEFAULT_SETTINGS,
                placeholder: ' ',
                messages: {
                    invalid: 'Invalid CVC',
                    required: 'Field "CVC" is mandatory'
                },
            };
            const expirationField = {
                ...DEFAULT_SETTINGS,
                placeholder: ' ',
                messages: {
                    invalid: 'Invalid Expiration',
                    required: 'Field "Expiration" is mandatory'
                },
            };


            const cardNumber = fields.create(PayMe.fields.NUMBER, cardNumberSettings);
            allFieldsReady.push(
                cardNumber.mount('#card-number-container3')
            );
            cardNumber.on('keyup', toggleValidationMessages.bind(errorsMessages, numberGroup));
            cardNumber.on('focus', () => focusOnField('card-number-container3'));
            cardNumber.on('blur', () => unfocusFields(cardNumber, 'card-number-container3'));


            const expiration = fields.create(PayMe.fields.EXPIRATION, expirationField);
            allFieldsReady.push(
                expiration.mount('#card-expiration-container3')
            );
            expiration.on('keyup', toggleValidationMessages.bind(errorsMessages, expirationGroup));
            expiration.on('validity-changed', toggleValidationMessages.bind(errorsMessages, expirationGroup));
            expiration.on('focus', () => focusOnField('card-expiration-container3'));
            expiration.on('blur', () => unfocusFields(expiration, 'card-expiration-container3'));

            const cvc = fields.create(PayMe.fields.CVC, cvcField);
            allFieldsReady.push(
                cvc.mount('#card-cvv-container3')
            );
            cvc.on('keyup', toggleValidationMessages.bind(errorsMessages, cvcGroup));
            cvc.on('validity-changed', toggleValidationMessages.bind(errorsMessages, cvcGroup));
            cvc.on('focus', () => focusOnField('card-cvv-container3'));
            cvc.on('blur', () => unfocusFields(cvc, 'card-cvv-container3'));

            const phone = fields.create(PayMe.fields.PHONE, phoneField);
            allFieldsReady.push(
                phone.mount('#phone-container3')
            );
            phone.on('keyup', toggleValidationMessages.bind(errorsMessages, phoneGroup));
            phone.on('validity-changed', toggleValidationMessages.bind(errorsMessages, phoneGroup));
            phone.on('focus', () => focusOnField('phone-container3'));
            phone.on('blur', () => unfocusFields(phone, 'phone-container3'));

            const email = fields.create(PayMe.fields.EMAIL, emailField);
            allFieldsReady.push(
                email.mount('#email-container3')
            );
            email.on('keyup', toggleValidationMessages.bind(errorsMessages, emailGroup));
            email.on('validity-changed', toggleValidationMessages.bind(errorsMessages, emailGroup));
            email.on('focus', () => focusOnField('email-container3'));
            email.on('blur', () => unfocusFields(email, 'email-container3'));

            const firstName = fields.create(PayMe.fields.NAME_FIRST, firstNameField);
            allFieldsReady.push(
                firstName.mount('#first-name-container3')
            );
            firstName.on('keyup', toggleValidationMessages.bind(errorsMessages, firstNameGroup));
            firstName.on('validity-changed', toggleValidationMessages.bind(errorsMessages, firstNameGroup));
            firstName.on('focus', () => focusOnField('first-name-container3'));
            firstName.on('blur', () => unfocusFields(firstName, 'first-name-container3'));

            const lastName = fields.create(PayMe.fields.NAME_LAST, lastNamefield);
            allFieldsReady.push(
                lastName.mount('#last-name-container3')
            );
            lastName.on('keyup', toggleValidationMessages.bind(errorsMessages, lastNameroup));
            lastName.on('validity-changed', toggleValidationMessages.bind(errorsMessages, lastNameroup));
            lastName.on('focus', () => focusOnField('last-name-container3'));
            lastName.on('blur', () => unfocusFields(lastName, 'last-name-container3'));

            const socialId = fields.create(PayMe.fields.SOCIAL_ID, socialIdField);
            allFieldsReady.push(
                socialId.mount('#social-id-container3')
            );
            socialId.on('keyup', toggleValidationMessages.bind(errorsMessages, socialIdGroup));
            socialId.on('validity-changed', toggleValidationMessages.bind(errorsMessages, socialIdGroup));
            socialId.on('focus', () => focusOnField('social-id-container3'));
            socialId.on('blur', () => unfocusFields(socialId, 'social-id-container3'));

            Promise.all(allFieldsReady).then(() => submitButton.disabled = false);


            const firstNameClickLabel = () => {
                firstName.focus();
            };
            queryLabelFor('first-name-container3').addEventListener('click', firstNameClickLabel);
            const lasttNameClickLabel = () => {
                lastName.focus();
            };
            queryLabelFor('last-name-container3').addEventListener('click', lasttNameClickLabel);
            const emailClickLabel = () => {
                email.focus();
            };
            queryLabelFor('email-container3').addEventListener('click', emailClickLabel);
            const phoneClickLabel = () => {
                phone.focus();
            };
            queryLabelFor('phone-container3').addEventListener('click', phoneClickLabel);
            const cvvClickLabel = () => {
                cvc.focus();
            };
            queryLabelFor('card-cvv-container3').addEventListener('click', cvvClickLabel);
            const expirationClickLabel = () => {
                expiration.focus();
            };
            queryLabelFor('card-expiration-container3').addEventListener('click', expirationClickLabel);
            const cardNumberClickLabel = () => {
                cardNumber.focus();
            };
            queryLabelFor('card-number-container3').addEventListener('click', cardNumberClickLabel);
            const socialIdClickLabel = () => {
                socialId.focus();
            };
            queryLabelFor('social-id-container3').addEventListener('click', socialIdClickLabel);

            const formSubmit = ev => {
                ev.preventDefault();

                const sale = {

                    // payerFirstName: 'Vladimir',
                    // payerLastName 'kondratiev',
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

                        showSuccessQuery(data);

                        tokenizationFinished();
                    })
                    .catch(err => {
                        console.error(err);
                        alert('Tokenization failed');
                        successQuery.style.display = 'none';
                        form.style.display = 'block';
                        form.classList.remove('fadeOut');
                        tokenizationFinished();
                    });
            };

            const clickToBackOnForm = () => {
                successQuery.style.display = 'none';

                instance.teardown();

                form.removeEventListener('submit', formSubmit);
                backFormButton.removeEventListener('click', clickToBackOnForm);
                queryLabelFor('first-name-container3').removeEventListener('click', firstNameClickLabel);
                queryLabelFor('last-name-container3').removeEventListener('click', lasttNameClickLabel);
                queryLabelFor('email-container3').removeEventListener('click', emailClickLabel);
                queryLabelFor('phone-container3').removeEventListener('click', phoneClickLabel);
                queryLabelFor('card-cvv-container3').removeEventListener('click', cvvClickLabel);
                queryLabelFor('card-expiration-container3').removeEventListener('click', expirationClickLabel);
                queryLabelFor('card-number-container3').removeEventListener('click', cardNumberClickLabel);
                queryLabelFor('social-id-container3').removeEventListener('click', socialIdClickLabel);

                form.classList.remove('fadeOut');
                form.classList.add('fadeIn');
                form.style.display = 'block';
                document.querySelectorAll('.animated-label').forEach((el, index) => {
                    el.classList.remove('animated-label');
                });
                init();
            };

            form.addEventListener('submit', formSubmit);
            backFormButton.addEventListener('click', clickToBackOnForm);

        });
    }

    init();

})();

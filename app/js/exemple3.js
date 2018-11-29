/**
 * Created by thoryachev on 22.11.2018.
 */
// HELPERS ---------------------------------------------------------------------------------
(function (global) {
    const mpl = 'MPL15282-97137EVV-KOAOAOIT-VWCZPB8V';
    const consolePre = document.getElementById('console-pre3');

    const form = document.getElementById('checkout-form');
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

    submitButton.disabled = true;

    function tokenizationStarted() {
        submitButton.disabled = true;
        console.log('Tokenization started!');
    }

    function tokenizationFinished() {
        submitButton.disabled = false;
        console.log('Tokenization finished!');
    }

    const errorsFromField = {};


    function showErrors(errorsFromField, el, ev) {
        var highest = errorsFromField[Object.keys(errorsFromField).sort().pop()];
        el.classList.remove('fadeOutDown');
        if (!ev.message) {
            el.innerText = highest;
        } else {
            el.innerText = ev.message;
        }
    }

    function toggleValidationMessages(wrapper, ev) {
        if (ev.isValid) {
            wrapper.classList.remove('has-error');
            this.classList.remove('fadeInUp');
            this.classList.add('fadeOutDown');
            delete errorsFromField[ev.field]; // УДАЛЯЕМ КОНкретный эллемент из объекта который прошел валидацию
            if (Object.keys(errorsFromField).length > 0) { // если в объекте еще остались ошибки выводим их
                showErrors(errorsFromField, this, ev);
                this.classList.remove('fadeOutDown');
                this.classList.add('fadeInUp');
            }
        } else {
            errorsFromField[ev.field] = ev.message; //ЗАПИСЫВАЕМ ошибки в объект
            wrapper.classList.add('has-error');
            this.classList.remove('fadeOutDown');
            this.classList.add('fadeInUp');
            if (Object.keys(errorsFromField).length > 0) { //проверяем есть ли в обьекте еще какие то элементы
                showErrors(errorsFromField, this, ev); // и показываем их
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


    const allFieldsReady = [];


    PayMe.create(mpl, {
        testMode: true
    }).then((instance) => {

        const fields = instance.hostedFields();

        const cardNumberSettings = {
            placeholder: ' ',
            messages: {invalid: 'Bad credit card number'},
            styles: {
                base: {
                    'font-size': '16px',
                    'color': '#000',
                    'height': '50px',
                },
                invalid: {
                    'color': 'red'
                },
                valid: {
                    'color': '#000'
                }
            }
        };
        const firstNameField = {
            placeholder: ' ',
            styles: {
                base: {
                    'font-size': '16px',
                    'color': '#000',
                    'height': '50px',
                },
                invalid: {
                    'color': 'red'
                },
                valid: {
                    'color': '#000'
                }
            }
        };

        const lastNameield = {
            placeholder: ' ',
            styles: {
                base: {
                    'font-size': '16px',
                    'color': '#000',
                },
                invalid: {
                    'color': 'red'
                },
                valid: {
                    'color': '#000'
                }
            }
        };

        const emailField = {
            placeholder: ' ',
            styles: {
                base: {
                    'font-size': '16px',
                    'color': '#000',
                },
                invalid: {
                    'color': 'red'
                },
                valid: {
                    'color': '#000'
                }
            }
        };

        const phoneField = {
            placeholder: ' ',
            styles: {
                base: {
                    'font-size': '16px',
                    'color': '#000',
                },
                invalid: {
                    'color': 'red'
                },
                valid: {
                    'color': '#000'
                }
            }
        };

        const socialIdField = {
            placeholder: ' ',
            styles: {
                base: {
                    'font-size': '16px',
                    'color': '#000',
                },
                invalid: {
                    'color': 'red'
                },
                valid: {
                    'color': '#000'
                }
            }
        };
        const cvcField = {
            placeholder: ' ',
            styles: {
                base: {
                    'font-size': '16px',
                    'color': '#000',
                },
                invalid: {
                    'color': 'red'
                },
                valid: {
                    'color': '#000'
                }
            }
        };
        const expirationField = {
            placeholder: ' ',
            styles: {
                base: {
                    'font-size': '16px',
                    'color': '#000',
                },
                invalid: {
                    'color': 'red'
                },
                valid: {
                    'color': '#000'
                },

            }
        };


        const cardNumber = fields.create(PayMe.fields.NUMBER, cardNumberSettings);
        allFieldsReady.push(
            cardNumber.mount('#card-number-container3')
        );
        cardNumber.on('keyup', toggleValidationMessages.bind(errorsMessages, numberGroup));

        cardNumber.on('change', console.log);
        cardNumber.on('focus', console.log);
        cardNumber.on('blur', function () {
            document.querySelectorAll('.third-example label').forEach(function (el, index) {
                if(cardNumber.getState().isEmpty && el.getAttribute('for') === 'card-number-container3') {
                    el.classList.remove('animated-label');
                }
            })
        });
        cardNumber.on('keyup', function (e) {
            this.options.styles.base.color = 'green';
            console.log(this);
        });
        cardNumber.on('keydown', function (e) {
            console.log(this.options);
        });
        cardNumber.on('keypress', console.log);
        cardNumber.on('validity-changed', console.log);
        cardNumber.on('card-type-changed', console.log);

        const expiration = fields.create(PayMe.fields.EXPIRATION, expirationField);
        allFieldsReady.push(
            expiration.mount('#card-expiration-container3')
        );
        expiration.on('keyup', toggleValidationMessages.bind(errorsMessages, expirationGroup));
        expiration.on('validity-changed', toggleValidationMessages.bind(errorsMessages, expirationGroup));
        expiration.on('blur', function () {
            document.querySelectorAll('.third-example label').forEach(function (el, index) {
                if(expiration.getState().isEmpty && el.getAttribute('for') === 'card-expiration-container3') {
                    el.classList.remove('animated-label');
                }
            })
        });

        const cvc = fields.create(PayMe.fields.CVC, cvcField);
        allFieldsReady.push(
            cvc.mount('#card-cvv-container3')
        );
        cvc.on('keyup', toggleValidationMessages.bind(errorsMessages, cvcGroup));
        cvc.on('validity-changed', toggleValidationMessages.bind(errorsMessages, cvcGroup));
        cvc.on('blur', function () {
            document.querySelectorAll('.third-example label').forEach(function (el, index) {
                if(cvc.getState().isEmpty && el.getAttribute('for') === 'card-cvv-container3') {
                    el.classList.remove('animated-label');
                }
            })
        });

        const phone = fields.create(PayMe.fields.PHONE, phoneField);
        allFieldsReady.push(
            phone.mount('#phone-container3')
        );
        phone.on('keyup', toggleValidationMessages.bind(errorsMessages, phoneGroup));
        phone.on('validity-changed', toggleValidationMessages.bind(errorsMessages, phoneGroup));
        phone.on('blur', function () {
            document.querySelectorAll('.third-example label').forEach(function (el, index) {
                if(phone.getState().isEmpty && el.getAttribute('for') === 'phone-container3') {
                    el.classList.remove('animated-label');
                }
            })
        });

        const email = fields.create(PayMe.fields.EMAIL, emailField);
        allFieldsReady.push(
            email.mount('#email-container3')
        );
        email.on('keyup', toggleValidationMessages.bind(errorsMessages, emailGroup));
        email.on('validity-changed', toggleValidationMessages.bind(errorsMessages, emailGroup));
        email.on('blur', function () {
            document.querySelectorAll('.third-example label').forEach(function (el, index) {
                if(email.getState().isEmpty && el.getAttribute('for') === 'email-container3') {
                    el.classList.remove('animated-label');
                }
            })
        });

        const firstName = fields.create(PayMe.fields.NAME_FIRST, firstNameField);
        allFieldsReady.push(
            firstName.mount('#first-name-container3')
        );
        firstName.on('keyup', toggleValidationMessages.bind(errorsMessages, firstNameGroup));
        firstName.on('validity-changed', toggleValidationMessages.bind(errorsMessages, firstNameGroup));
        firstName.on('blur', function () {
            document.querySelectorAll('.third-example label').forEach(function (el, index) {
                if(firstName.getState().isEmpty && el.getAttribute('for') === 'first-name-container3') {
                    el.classList.remove('animated-label');
                }
            })
        });

        const lastName = fields.create(PayMe.fields.NAME_LAST, lastNameield);
        allFieldsReady.push(
            lastName.mount('#last-name-container3')
        );
        lastName.on('keyup', toggleValidationMessages.bind(errorsMessages, lastNameroup));
        lastName.on('validity-changed', toggleValidationMessages.bind(errorsMessages, lastNameroup));
        lastName.on('blur', function () {
            document.querySelectorAll('.third-example label').forEach(function (el, index) {
                if(lastName.getState().isEmpty && el.getAttribute('for') === 'last-name-container3') {
                    el.classList.remove('animated-label');
                }
            })
        });

        const socialId = fields.create(PayMe.fields.SOCIAL_ID, socialIdField);
        allFieldsReady.push(
            socialId.mount('#social-id-container3')
        );
        socialId.on('keyup', toggleValidationMessages.bind(errorsMessages, socialIdGroup));
        socialId.on('validity-changed', toggleValidationMessages.bind(errorsMessages, socialIdGroup));
        socialId.on('blur', function () {
            document.querySelectorAll('.third-example label').forEach(function (el, index) {
                if(socialId.getState().isEmpty && el.getAttribute('for') === 'social-id-container3') {
                    el.classList.remove('animated-label');
                }
            })
        });

        Promise.all(allFieldsReady).then(() => submitButton.disabled = false);

        document.querySelector('label[for=first-name-container3]').addEventListener('click', function(){
            this.classList.add('animated-label');
            firstName.focus();
        });

        document.querySelector('label[for=last-name-container3]').addEventListener('click', function(){
            this.classList.add('animated-label');
            lastName.focus();
        });
        document.querySelector('label[for=email-container3]').addEventListener('click', function(){
            this.classList.add('animated-label');
            email.focus();
        });
        document.querySelector('label[for=phone-container3]').addEventListener('click', function(){
            this.classList.add('animated-label');
            phone.focus();
        });
        document.querySelector('label[for=card-cvv-container3]').addEventListener('click', function(){
            this.classList.add('animated-label');
            cvc.focus();
        });
        document.querySelector('label[for=card-expiration-container3]').addEventListener('click', function(){
            this.classList.add('animated-label');
            expiration.focus();
        });
        document.querySelector('label[for=card-number-container3]').addEventListener('click', function(){
            this.classList.add('animated-label');
            cardNumber.focus();
        });
        document.querySelector('label[for=social-id-container3]').addEventListener('click', function(){
            this.classList.add('animated-label');
            socialId.focus();
        });

        form.addEventListener('submit', ev => {
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
                    consolePre.innerText = 'Tokenization result::: \r\n';
                    consolePre.innerText = consolePre.innerText + JSON.stringify(data, null, 2);

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

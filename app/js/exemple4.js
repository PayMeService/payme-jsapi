/**
 * Created by thoryachev on 22.11.2018.
 */
// HELPERS ---------------------------------------------------------------------------------
(function (global) {
    const mpl3 = 'MPL15282-97137EVV-KOAOAOIT-VWCZPB8V';
    const consolePre3 = document.getElementById('console-pre4');
    const cardProvider4 = document.getElementById('card-provider4');

    const form3 = document.getElementById('checkout-form4');
    const errorsMessages3 = document.getElementById('errors4');

    const numberGroup3 = document.getElementById('card-number-group4');

    const expirationGroup3 = document.getElementById('card-expiration-group4');

    const cvcGroup3 = document.getElementById('card-cvv-group4');

    const firstNameGroup3 = document.getElementById('first-name-group4');

    const lastNameGroup3 = document.getElementById('last-name-group4');

    const emailGroup3 = document.getElementById('email-group4');

    const phoneGroup3 = document.getElementById('phone-group4');

    const socialIdGroup3 = document.getElementById('social-id-group4');

    const submitButton3 = document.getElementById('submit-button4');

    submitButton3.disabled = true;

    function tokenizationStarted() {
        submitButton3.disabled = true;
        console.log('Tokenization started!');
    }

    function tokenizationFinished() {
        submitButton3.disabled = false;
        console.log('Tokenization finished!');
    }

    const errorsFromField3 = {};


    function showErrors3(errorsFromField, el, ev) {
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
        console.log(errorsFromField3);
        console.log(ev);
        if (ev.isValid) {
            wrapper.classList.remove('has-error');
            this.classList.remove('fadeInUp');
            this.classList.add('fadeOutDown');
            delete errorsFromField3[ev.field]; // УДАЛЯЕМ КОНкретный эллемент из объекта который прошел валидацию
            if (Object.keys(errorsFromField3).length > 0) { // если в объекте еще остались ошибки выводим их
                showErrors3(errorsFromField3, this, ev);
                this.classList.remove('fadeOutDown');
                this.classList.add('fadeInUp');
            }
        } else {
            errorsFromField3[ev.field] = ev.message; //ЗАПИСЫВАЕМ ошибки в объект
            wrapper.classList.add('has-error');
            console.log(wrapper);
            this.classList.remove('fadeOutDown');
            this.classList.add('fadeInUp');
            if (Object.keys(errorsFromField3).length > 0) { //проверяем есть ли в обьекте еще какие то элементы
                showErrors3(errorsFromField3, this, ev); // и показываем их
            }
        }
    }

    function changeCardProviderIcon(cardVendor) {

        const vendorsToClasses = {
            'unknown': ['fas', 'fa-credit-card'],

            'amex': ['fab', 'fa-cc-amex'],
            'diners': ['fab', 'fa-cc-diners-club'],
            'jcb': ['fab', 'fa-cc-jcb'],
            'visa': ['fab', 'fa-cc-visa'],
            'mastercard': ['fab', 'fa-cc-mastercard'],
            'discover': ['fab', 'fa-cc-discover'],
        };

        cardProvider4.classList.remove(...cardProvider4.classList);
        cardProvider4.classList.add(...(vendorsToClasses[cardVendor] ? vendorsToClasses[cardVendor] : vendorsToClasses['unknown']));
    }


    const allFieldsReady3 = [];

    PayMe.create(mpl3, {
        testMode: true
    }).then((instance) => {

        const fields3 = instance.hostedFields();

        const cardNumberSettings3 = {
            placeholder: '1234 1234 1234 1234',
            messages: {invalid: 'Bad credit card number'},
            styles: {
                base: {
                    'font-size': '16px',
                    'color': '#000',
                    'height': '50px',
                    '::placeholder': {'color': '#D3DAE2'}
                },
                invalid: {
                    'color': 'red'
                },
                valid: {
                    'color': '#000'
                }
            }
        };
        const firstNameField3 = {
            placeholder: 'First name',
            // messages: { invalid: 'Bad credit card number' },
            styles: {
                base: {
                    'font-size': '16px',
                    'color': '#000',
                    'height': '50px',
                    '::placeholder': {'color': '#D3DAE2'}
                },
                invalid: {
                    'color': 'red'
                },
                valid: {
                    'color': '#000'
                }
            }
        };

        const lastNameField3 = {
            placeholder: 'Last name',
            // messages: { invalid: 'Bad credit card number' },
            styles: {
                base: {
                    'font-size': '16px',
                    'color': '#000',
                    '::placeholder': {'color': '#D3DAE2'}
                },
                invalid: {
                    'color': 'red'
                },
                valid: {
                    'color': '#000'
                }
            }
        };

        const emailField3 = {
            placeholder: 'Email',
            // messages: { invalid: 'Bad credit card number' },
            styles: {
                base: {
                    'font-size': '16px',
                    'color': '#000',
                    '::placeholder': {'color': '#D3DAE2'}
                },
                invalid: {
                    'color': 'red'
                },
                valid: {
                    'color': '#000'
                }
            }
        };

        const phoneField3 = {
            placeholder: 'Phone',
            // messages: { invalid: 'Bad credit card number' },
            styles: {
                base: {
                    'font-size': '16px',
                    'color': '#000',
                    '::placeholder': {'color': '#D3DAE2'}
                },
                invalid: {
                    'color': 'red'
                },
                valid: {
                    'color': '#000'
                }
            }
        };

        const socialIdField3 = {
            placeholder: 'Social ID',
            // messages: { invalid: 'Bad credit card number' },
            styles: {
                base: {
                    'font-size': '16px',
                    'color': '#000',
                    '::placeholder': {'color': '#D3DAE2'}
                },
                invalid: {
                    'color': 'red'
                },
                valid: {
                    'color': '#000'
                }
            }
        };
        const cvcField3 = {
            placeholder: 'CVC',
            // messages: { invalid: 'Bad credit card number' },
            styles: {
                base: {
                    'font-size': '16px',
                    'color': '#000',
                    '::placeholder': {'color': '#D3DAE2'}
                },
                invalid: {
                    'color': 'red'
                },
                valid: {
                    'color': '#000'
                }
            }
        };
        const expirationField3 = {
            // placeholder: 'CVC',
            // messages: { invalid: 'Bad credit card number' },
            styles: {
                base: {
                    'font-size': '16px',
                    'color': '#000',
                    '::placeholder': {'color': '#D3DAE2'}
                },
                invalid: {
                    'color': 'red'
                },
                valid: {
                    'color': '#000'
                },

            }
        };
        const cardNumber3 = fields3.create(PayMe.fields.NUMBER, cardNumberSettings3);
        allFieldsReady3.push(
            cardNumber3.mount('#card-number-container4')
        );
        cardNumber3.on('card-type-changed', ev => changeCardProviderIcon(ev.cardType));
        cardNumber3.on('keyup', toggleValidationMessages.bind(errorsMessages3, numberGroup3));

        cardNumber3.on('change', console.log);
        cardNumber3.on('blur', console.log);
        cardNumber3.on('focus', function () {
            console.log('focus');
            console.log(this);
        });
        cardNumber3.on('keyup', function (e) {
            // this.options.styles.base.color = 'green';
            // console.log(this);
        });
        cardNumber3.on('keydown', function (e) {
            // console.log(this.options);
        });
        cardNumber3.on('keypress', console.log);
        cardNumber3.on('validity-changed', console.log);
        cardNumber3.on('card-type-changed', console.log);

        const expiration3 = fields3.create(PayMe.fields.EXPIRATION, expirationField3);
        allFieldsReady3.push(
            expiration3.mount('#card-expiration-container4')
        );
        expiration3.on('keyup', toggleValidationMessages.bind(errorsMessages3, expirationGroup3));
        expiration3.on('validity-changed', toggleValidationMessages.bind(errorsMessages3, expirationGroup3));

        const cvc3 = fields3.create(PayMe.fields.CVC, cvcField3);
        allFieldsReady3.push(
            cvc3.mount('#card-cvv-container4')
        );
        cvc3.on('keyup', toggleValidationMessages.bind(errorsMessages3, cvcGroup3));
        cvc3.on('validity-changed', toggleValidationMessages.bind(errorsMessages3, cvcGroup3));

        const phone3 = fields3.create(PayMe.fields.PHONE, phoneField3);
        allFieldsReady3.push(
            phone3.mount('#phone-container4')
        );
        phone3.on('keyup', toggleValidationMessages.bind(errorsMessages3, phoneGroup3));
        phone3.on('validity-changed', toggleValidationMessages.bind(errorsMessages3, phoneGroup3));

        const email3 = fields3.create(PayMe.fields.EMAIL, emailField3);
        allFieldsReady3.push(
            email3.mount('#email-container4')
        );
        email3.on('keyup', toggleValidationMessages.bind(errorsMessages3, emailGroup3));
        email3.on('validity-changed', toggleValidationMessages.bind(errorsMessages3, emailGroup3));

        const firstName3 = fields3.create(PayMe.fields.NAME_FIRST, firstNameField3);
        allFieldsReady3.push(
            firstName3.mount('#first-name-container4')
        );
        firstName3.on('keyup', toggleValidationMessages.bind(errorsMessages3, firstNameGroup3));
        firstName3.on('validity-changed', toggleValidationMessages.bind(errorsMessages3, firstNameGroup3));

        const lastName3 = fields3.create(PayMe.fields.NAME_LAST, lastNameField3);
        allFieldsReady3.push(
            lastName3.mount('#last-name-container4')
        );
        lastName3.on('keyup', toggleValidationMessages.bind(errorsMessages3, lastNameGroup3));
        lastName3.on('validity-changed', toggleValidationMessages.bind(errorsMessages3, lastNameGroup3));

        const socialId3 = fields3.create(PayMe.fields.SOCIAL_ID, socialIdField3);
        allFieldsReady3.push(
            socialId3.mount('#social-id-container4')
        );
        socialId3.on('keyup', toggleValidationMessages.bind(errorsMessages3, socialIdGroup3));
        socialId3.on('validity-changed', toggleValidationMessages.bind(errorsMessages3, socialIdGroup3));

        Promise.all(allFieldsReady3).then(() => submitButton3.disabled = false);

        form3.addEventListener('submit', ev => {
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
                    consolePre3.innerText = 'Tokenization result::: \r\n';
                    consolePre3.innerText = consolePre3.innerText + JSON.stringify(data, null, 2);

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

/**
 * Created by thoryachev on 22.11.2018.
 */
// HELPERS ---------------------------------------------------------------------------------
(function (global) {
    const mpl = 'MPL15282-97137EVV-KOAOAOIT-VWCZPB8V';

    const consolePre = document.getElementById('console-pre');
    const form = document.getElementById('checkout-form');
    const cardProvider = document.getElementById('card-provider');

    const errorsMessages = document.getElementById('errors');

    const numberGroup = document.getElementById('card-number-group');
// const numberMessages = document.getElementById('errors');

    const expirationGroup = document.getElementById('card-expiration-group');
// const expirationMessages = document.getElementById('errors');

    const cvcGroup = document.getElementById('card-cvv-group');
// const cvcMessages = document.getElementById('errors');

    const firstNameGroup = document.getElementById('first-name-group');
// const firstNameMessages = document.getElementById('errors');

    const lastNameGroup = document.getElementById('last-name-group');
// const lastNameMessages = document.getElementById('errors');

    const emailGroup = document.getElementById('email-group');
// const emailMessages = document.getElementById('errors');

    const phoneGroup = document.getElementById('phone-group');
// const phoneMessages = document.getElementById('errors');

    const socialIdGroup = document.getElementById('social-id-group');
// const socialIdMessages = document.getElementById('errors');


// -----------------------------------------------------------------------------------------------------------------

    const submitButton = document.getElementById('submit-button');
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
        console.log(errorsFromField);
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
            console.log(this);
            this.classList.remove('fadeOutDown');
            this.classList.add('fadeInUp');
            if (Object.keys(errorsFromField).length > 0) { //проверяем есть ли в обьекте еще какие то элементы
                showErrors(errorsFromField, this, ev); // и показываем их
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

        cardProvider.classList.remove(...cardProvider.classList);
        cardProvider.classList.add(...(vendorsToClasses[cardVendor] ? vendorsToClasses[cardVendor] : vendorsToClasses['unknown']));
    }

// -----------------------------------------------------------------------------------------------------------------

    const allFieldsReady = [];

    PayMe.create(mpl, {
        testMode: true
    }).then((instance) => {

        const fields = instance.hostedFields();

        const cardNumberSettings = {
            placeholder: 'Credit Card Number',
            messages: {
                invalid: 'Bad credit card number',
                required: 'Field "Card Number" is mandatory'
            },
            styles: {
                base: {
                    'font-size': '16px',
                    '::placeholder': {'color': '#86B0FE'}
                },
                invalid: {
                    'color': 'red',
                },
                valid: {
                    'color': '#fff',
                },
            }
        };

        const firstNameField = {
            placeholder: 'First name',
            messages: {
                invalid: 'Letters only for field "First name"',
                required: 'Field "First name" is mandatory'
            },
            styles: {
                base: {
                    'color': '#fff',
                    'font-size': '16px',
                    'letter-spacing': '1px',
                    '::placeholder': {'color': '#84ABFF'}
                },
                invalid: {
                    'color': 'red'
                },
                valid: {
                    'color': '#fff'
                }
            }
        };

        const lastNameField = {
            placeholder: 'Last name',
            messages: {
                invalid: 'Letters only for field "Last name"',
                required: 'Field "Last name" is mandatory'
            },
            styles: {
                base: {
                    'color': '#fff',
                    'font-size': '16px',
                    'letter-spacing': '1px',
                    '::placeholder': {'color': '#84ABFF'}
                },
                invalid: {
                    'color': 'red'
                },
                valid: {
                    'color': '#fff'
                }
            }
        };

        const emailField = {
            messages: {
                invalid: 'Invalid Email',
                required: 'Field "Email" is mandatory'
            },
            styles: {
                base: {
                    'color': '#fff',
                    'font-size': '16px',
                    'letter-spacing': '1px',
                    '::placeholder': {'color': '#84ABFF'}

                },
                invalid: {
                    'color': 'red'
                },
                valid: {
                    'color': '#fff'
                }
            }
        };

        const phoneField = {
            messages: {
                invalid: 'Invalid Phone',
                required: 'Field "Phone" is mandatory'
            },
            styles: {
                base: {
                    'color': '#fff',
                    'font-size': '16px',
                    'letter-spacing': '1px',
                    '::placeholder': {'color': '#84ABFF'}

                },
                invalid: {
                    'color': 'red'
                },
                valid: {
                    'color': '#fff'
                }
            }
        };

        const socialIdField = {
            messages: {
                required: 'Field "Social Id" is mandatory'
            },
            styles: {
                base: {
                    'color': '#fff',
                    'font-size': '16px',
                    'letter-spacing': '1px',
                    '::placeholder': {'color': '#84ABFF'}
                },
                invalid: {
                    'color': 'red'
                },
                valid: {
                    'color': '#fff'
                }
            }
        };
        const cvcField = {
            messages: {
                invalid: 'Invalid CVC',
                required: 'Field "CVC" is mandatory'
            },
            placeholder: 'CVV',
            styles: {
                base: {
                    'color': '#fff',
                    'font-size': '16px',
                    'letter-spacing': '1px',
                    '::placeholder': {'color': '#84ABFF'}
                },
                invalid: {
                    'color': 'red'
                },
                valid: {
                    'color': '#fff'
                }
            }
        };
        const expirationField = {
            messages: {
                invalid: 'Invalid Expiration',
                required: 'Field "Expiration" is mandatory'
            },
            styles: {
                base: {
                    'color': '#fff',
                    'font-size': '16px',
                    'letter-spacing': '1px',
                    '::placeholder': {'color': '#84ABFF'}
                },
                invalid: {
                    'color': 'red'
                },
                valid: {
                    'color': '#fff'
                },
                '::placholder': ''
            }
        };
        const cardNumber = fields.create(PayMe.fields.NUMBER, cardNumberSettings);
        allFieldsReady.push(
            cardNumber.mount('#card-number-container')
        );
        cardNumber.on('card-type-changed', ev => changeCardProviderIcon(ev.cardType));
        cardNumber.on('keyup', toggleValidationMessages.bind(errorsMessages, numberGroup));

        cardNumber.on('change', console.log);
        cardNumber.on('blur', console.log);
        cardNumber.on('focus', console.log);
        cardNumber.on('keyup', function (e) {
            // console.log(this);
        });
        cardNumber.on('keydown', function (e) {
            // console.log(this.options);
        });
        cardNumber.on('keypress', console.log);
        cardNumber.on('validity-changed', console.log);
        cardNumber.on('card-type-changed', console.log);

        const expiration = fields.create(PayMe.fields.EXPIRATION, expirationField);
        allFieldsReady.push(
            expiration.mount('#card-expiration-container')
        );
        expiration.on('keyup', toggleValidationMessages.bind(errorsMessages, expirationGroup));
        expiration.on('validity-changed', toggleValidationMessages.bind(errorsMessages, expirationGroup));

        const cvc = fields.create(PayMe.fields.CVC, cvcField);
        allFieldsReady.push(
            cvc.mount('#card-cvv-container')
        );
        cvc.on('keyup', toggleValidationMessages.bind(errorsMessages, cvcGroup));
        cvc.on('validity-changed', toggleValidationMessages.bind(errorsMessages, cvcGroup));

        const phone = fields.create(PayMe.fields.PHONE, phoneField);
        allFieldsReady.push(
            phone.mount('#phone-container')
        );
        phone.on('keyup', toggleValidationMessages.bind(errorsMessages, phoneGroup));
        phone.on('validity-changed', toggleValidationMessages.bind(errorsMessages, phoneGroup));

        const email = fields.create(PayMe.fields.EMAIL, emailField);
        allFieldsReady.push(
            email.mount('#email-container')
        );
        email.on('keyup', toggleValidationMessages.bind(errorsMessages, emailGroup));
        email.on('validity-changed', toggleValidationMessages.bind(errorsMessages, emailGroup));

        const firstName = fields.create(PayMe.fields.NAME_FIRST, firstNameField);
        allFieldsReady.push(
            firstName.mount('#first-name-container')
        );
        firstName.on('keyup', toggleValidationMessages.bind(errorsMessages, firstNameGroup));
        firstName.on('validity-changed', toggleValidationMessages.bind(errorsMessages, firstNameGroup));

        const lastName = fields.create(PayMe.fields.NAME_LAST, lastNameField);
        allFieldsReady.push(
            lastName.mount('#last-name-container')
        );
        lastName.on('keyup', toggleValidationMessages.bind(errorsMessages, lastNameGroup));
        lastName.on('validity-changed', toggleValidationMessages.bind(errorsMessages, lastNameGroup));

        const socialId = fields.create(PayMe.fields.SOCIAL_ID, socialIdField);
        allFieldsReady.push(
            socialId.mount('#social-id-container')
        );
        socialId.on('keyup', toggleValidationMessages.bind(errorsMessages, socialIdGroup));
        socialId.on('validity-changed', toggleValidationMessages.bind(errorsMessages, socialIdGroup));

        Promise.all(allFieldsReady).then(() => submitButton.disabled = false);

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
                    consolePre.innerText = 'Tokenization result::: \r\n';
                    consolePre.innerText = consolePre.innerText + JSON.stringify(data, null, 2);

                    tokenizationFinished();
                })
                .catch(err => {
                    console.error(err);

                    tokenizationFinished();
                });
        });

// document.getElementById('tear-down').addEventListener('click', () => instance.teardown());

    });


})();


// var frm = document.getElementsByTagName('iframe');
// console.log(frm[0]);

// window.onload = function() {
//     var frm = document.getElementsByTagName('iframe');
//     console.log(frm[0].document.getElementsByTagName('body'));
//     // var otherhead = frm[0].getElementByTagName("html");
//     // var link = frm[0].getElementsByTagName("style");
//     // console.log(link.style.color = 'green');
//     // link.setAttribute("rel", "stylesheet");
//     // link.setAttribute("type", "text/css");
//     // link.setAttribute("href", "css/main.min.css");
//     // otherhead.appendChild(link);
// };


//
// // выбираем целевой элемент
// var target = document.getElementById('errors');
//
// // создаём экземпляр MutationObserver
// var observer = new MutationObserver(function(mutations) {
//     mutations.forEach(function(mutation) {
//         // console.log(mutation.target.style.display = 'block');
//         // console.log(mutation.target.style.display = 'block');
//     });
// });
//
// // конфигурация нашего observer:
// var config = { attributes: true, childList: true, characterData: true };
//
// // передаём в качестве аргументов целевой элемент и его конфигурацию
// observer.observe(target, config);


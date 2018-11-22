// /**
//  * Created by thoryachev on 22.11.2018.
//  */
// // HELPERS ---------------------------------------------------------------------------------
//
// const mpl2 = 'MPL15282-97137EVV-KOAOAOIT-VWCZPB8V';
//
// const consolePre2 = document.getElementById('console-pre2');
// const form2 = document.getElementById('checkout-form2');
// const cardProvider2 = document.getElementById('card-provider2');
//
// const numberGroup2 = document.getElementById('card-number-group2');
// const numberMessages2 = document.getElementById('card-number-messages2');
//
// const expirationGroup2 = document.getElementById('card-expiration-group2');
// const expirationMessages2 = document.getElementById('card-expiration-messages2');
//
// const cvcGroup2 = document.getElementById('card-cvv-group2');
// const cvcMessages2 = document.getElementById('card-cvv-messages2');
//
// const firstNameGroup2 = document.getElementById('first-name-group2');
// const firstNameMessages2 = document.getElementById('first-name-messages2');
//
// const lastNameGroup2 = document.getElementById('last-name-group2');
// const lastNameMessages2 = document.getElementById('last-name-messages2');
//
// const emailGroup2 = document.getElementById('email-group2');
// const emailMessages2 = document.getElementById('email-messages2');
//
// const phoneGroup2 = document.getElementById('phone-group2');
// const phoneMessages2 = document.getElementById('phone-messages2');
//
// const socialIdGroup2 = document.getElementById('social-id-group2');
// const socialIdMessages2 = document.getElementById('social-id-messages2');
//
//
// // -----------------------------------------------------------------------------------------------------------------
//
// const submitButton2 = document.getElementById('submit-button2');
// submitButton2.disabled = true;
//
// function tokenizationStarted() {
//     submitButton2.disabled = true;
//     console.log('Tokenization started!');
// }
//
// function tokenizationFinished() {
//     submitButton2.disabled = false;
//     console.log('Tokenization finished!');
// }
//
// function toggleValidationMessages(wrapper, ev) {
//     if (ev.isValid) {
//         this.style.display = 'none';
//         wrapper.classList.remove('has-error');
//     } else {
//         this.innerText = ev.message;
//         this.style.display = 'block';
//         wrapper.classList.add('has-error');
//     }
// }
//
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
//
// // -----------------------------------------------------------------------------------------------------------------
//
// const allFieldsReady2 = [];
//
// PayMe.create(mpl2, {
//     testMode: true
// }).then((instance) => {
//
//     const fields2 = instance.hostedFields();
//
//     const cardNumberSettings = {
//         placeholder: 'Credit Card Number',
//         messages: { invalid: 'Bad credit card number' },
//         styles: {
//             base: {
//                 'font-size': '40px',
//                 'text-align': 'center',
//                 'letter-spacing': '5px'
//             },
//             invalid: {
//                 'color': 'red'
//             },
//             valid: {
//                 'color': 'green'
//             }
//         }
//     };
//     const cardNumber = fields2.create(PayMe.fields.NUMBER, cardNumberSettings);
//     allFieldsReady2.push(
//         cardNumber.mount('#card-number-container')
//     );
//     cardNumber.on('card-type-changed', ev => changeCardProviderIcon(ev.cardType));
//     cardNumber.on('keyup', toggleValidationMessages.bind(numberMessages2, numberGroup2));
//
//     cardNumber.on('change', console.log);
//     cardNumber.on('blur', console.log);
//     cardNumber.on('focus', console.log);
//     cardNumber.on('keyup', function (e) {
//         this.options.styles.base.color = 'green';
//         console.log(this);
//     });
//     cardNumber.on('keydown', function (e) {
//         console.log(this.options);
//     });
//     cardNumber.on('keypress', console.log);
//     cardNumber.on('validity-changed', console.log);
//     cardNumber.on('card-type-changed', console.log);
//
//     const expiration = fields2.create(PayMe.fields.EXPIRATION);
//     allFieldsReady2.push(
//         expiration.mount('#card-expiration-container')
//     );
//     expiration.on('keyup', toggleValidationMessages.bind(expirationMessages2, expirationGroup2));
//     expiration.on('validity-changed', toggleValidationMessages.bind(expirationMessages2, expirationGroup2));
//
//     const cvc = fields.create(PayMe.fields.CVC);
//     allFieldsReady2.push(
//         cvc.mount('#card-cvv-container')
//     );
//     cvc.on('keyup', toggleValidationMessages.bind(cvcMessages2, cvcGroup2));
//     cvc.on('validity-changed', toggleValidationMessages.bind(cvcMessages2, cvcGroup2));
//
//     const phone = fields.create(PayMe.fields.PHONE);
//     allFieldsReady2.push(
//         phone.mount('#phone-container')
//     );
//     phone.on('keyup', toggleValidationMessages.bind(phoneMessages2, phoneGroup2));
//     phone.on('validity-changed', toggleValidationMessages.bind(phoneMessages2, phoneGroup2));
//
//     const email = fields.create(PayMe.fields.EMAIL);
//     allFieldsReady2.push(
//         email.mount('#email-container')
//     );
//     email.on('keyup', toggleValidationMessages.bind(emailMessages2, emailGroup2));
//     email.on('validity-changed', toggleValidationMessages.bind(emailMessages2, emailGroup2));
//
//     const firstName = fields.create(PayMe.fields.NAME_FIRST);
//     allFieldsReady2.push(
//         firstName.mount('#first-name-container')
//     );
//     firstName.on('keyup', toggleValidationMessages.bind(firstNameMessages2, firstNameGroup2));
//     firstName.on('validity-changed', toggleValidationMessages.bind(firstNameMessages2, firstNameGroup2));
//
//     const lastName = fields.create(PayMe.fields.NAME_LAST);
//     allFieldsReady2.push(
//         lastName.mount('#last-name-container')
//     );
//     lastName.on('keyup', toggleValidationMessages.bind(lastNameMessages2, lastNameGroup2));
//     lastName.on('validity-changed', toggleValidationMessages.bind(lastNameMessages2, lastNameGroup2));
//
//     const socialId = fields.create(PayMe.fields.SOCIAL_ID);
//     allFieldsReady2.push(
//         socialId.mount('#social-id-container')
//     );
//     socialId.on('keyup', toggleValidationMessages.bind(socialIdMessages2, socialIdGroup2));
//     socialId.on('validity-changed', toggleValidationMessages.bind(socialIdMessages2, socialIdGroup2));
//
//     Promise.all(allFieldsReady2).then(() => submitButton2.disabled = false);
//
//     form2.addEventListener('submit', ev => {
//         ev.preventDefault();
//
//         const sale = {
//
//             // payerFirstName: 'Vladimir',
//             // payerLastName: 'kondratiev',
//             // payerEmail: 'trahomoto@mailforspam.com',
//             // payerPhone: '1231231',
//
//             payerSocialId: '65656',
//
//             total: {
//                 label: '🚀 Rubber duck',
//                 amount: {
//                     currency: 'ILS',
//                     value: '55.00',
//                 }
//             }
//         };
//
//
//         tokenizationStarted();
//
//         instance.tokenize(sale)
//             .then(data => {
//                 console.log('Tokenization result::: ', data);
//                 consolePre2.innerText = 'Tokenization result::: \r\n';
//                 consolePre2.innerText = consolePre2.innerText + JSON.stringify(data, null, 2);
//
//                 tokenizationFinished();
//             })
//             .catch(err => {
//                 console.error(err);
//
//                 tokenizationFinished();
//             });
//     });
//
// //document.getElementById('tear-down').addEventListener('click', () => instance.teardown());
//
// });
//
//

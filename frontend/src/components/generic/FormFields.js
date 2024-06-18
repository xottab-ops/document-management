import * as Yup from "yup";

const customerFields = {
    name: {
        label: 'ФИО заказчика',
        validation: Yup.string().required('Фамилия Имя Отчество обязательно')
            .min(5, 'Фамилия Имя Отчество должно быть не менее 5 символов'),
        'isDate': false
    },
    phone_number: {
        label: 'Номер телефона',
        validation: Yup.string().required('Номер телефона обязателен')
            .matches(/^\+[0-9]{11}$/, 'Номер телефона должен +(регион)(остальные цифры). Пример: +79999999999'),
        'isDate': false
    },
    email: {
        label: 'Email',
        validation: Yup.string().required('Email обязателен').email('Неправильный формат email'),
        'isDate': false
    },
    passport_number: {
        label: 'Серия и номер паспорта',
        validation: Yup.string().required('Серия и номер паспорта обязательны')
            .matches(/^[0-9]{4} [0-9]{6}$/, 'Серия и номер паспорта должны быть в формате 1234 567890')
    },
    passport_issuance: {
        label: 'Место выдачи паспорта',
        validation: Yup.string().required('Место выдачи паспорта обязательно')
    },
    passport_registration: {
        label: 'Регистрация',
        validation: Yup.string().required('Регистрация обязательна')
    },
    passport_issue_date: {
        label: 'Дата выдачи',
        validation: Yup.date()
            .required('Обязательно для заполнения | Дата введена не верно')
            .test('is-not-future-date', 'Дата не может быть в будущем', value => {
                return value && new Date(value) <= new Date();
            }),
        'isDate': true
    },
    passport_division_code: {
        label: 'Код подразделения',
        validation: Yup.string().required('Код подразделения обязателен')
            .matches(/^[0-9]{3}-[0-9]{3}$/, 'Код подразделения должен быть в формате 123-456')
    }
};

const studentFields = {
    name: {
        label: 'ФИО студента',
        validation: Yup.string().required('Фамилия Имя Отчество обязательно')
            .min(5, 'Фамилия Имя Отчество должно быть не менее 5 символов'),
    },
    phone_number: {
        label: 'Номер телефона',
        validation: Yup.string().required('Номер телефона обязателен')
            .matches(/^\+[0-9]{11}$/, 'Номер телефона должен +(регион)(остальные цифры). Пример: +79999999999')
    },

};

const contractFields = Yup.object().shape({
    student: Yup.object().required('Выбрать студента обязательно'),
    customer: Yup.object().required('Выбрать заказчика обязательно'),
    study_group: Yup.object().required('Выбрать учебную группу обязательно'),
    contract_creation_date: Yup.date().required('Обязательно для заполнения | Дата введена не верно'),
    contract_expiration_date: Yup.date().min(Yup.ref('contract_creation_date'), 'Дата окончания не может быть раньше даты начала договора')
        .required('Обязательно для заполнения | Дата введена не верно')

});

export { customerFields, studentFields, contractFields }
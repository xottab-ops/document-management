from datetime import datetime

import pymorphy3 as pm3
from docxtpl import DocxTemplate
from io import BytesIO
from number_to_string import get_string_by_number


def decline_fio(fio, case):
    morph = pm3.MorphAnalyzer()
    words = fio.split()
    declined_words = []

    for word in words:
        parsed_word = morph.parse(word)[0]
        declined_word = parsed_word.inflect({case})
        if declined_word:
            declined_words.append(declined_word.word.capitalize())  # заглавная первая буква
        else:
            declined_words.append(word.capitalize())  # если не удалось склонить, оставляем как есть

    return ' '.join(declined_words)


def month_number_to_string(month_number):
    match int(month_number):
        case 1:
            return 'января'
        case 2:
            return 'февраля'
        case 3:
            return 'марта'
        case 4:
            return 'апреля'
        case 5:
            return 'мая'
        case 6:
            return 'июня'
        case 7:
            return 'июля'
        case 8:
            return 'августа'
        case 9:
            return 'сентября'
        case 10:
            return 'октября'
        case 11:
            return 'ноября'
        case 12:
            return 'декабря'


def month_number_to_string_default(month_number):
    match int(month_number):
        case 1:
            return 'январь'
        case 2:
            return 'февраль'
        case 3:
            return 'март'
        case 4:
            return 'апрель'
        case 5:
            return 'май'
        case 6:
            return 'июнь'
        case 7:
            return 'июль'
        case 8:
            return 'август'
        case 9:
            return 'сентябрь'
        case 10:
            return 'октябрь'
        case 11:
            return 'ноябрь'
        case 12:
            return 'декабрь'


def generate(contract):
    start_date: datetime = contract.study_group.education_date_start
    end_date: datetime = contract.study_group.education_date_end
    contract_start_date: datetime = contract.contract_creation_date
    contract_end_date: datetime = contract.contract_expiration_date
    context = {
        "CONTRACT_NUMBER": contract.id,
        "CONTRACT_START_DAY": str(contract_start_date.day),
        "CONTRACT_START_MONTH": month_number_to_string(contract_start_date.month),
        "CONTRACT_START_YEAR": str(contract_start_date.year),
        "CONTRACT_END_DAY": str(contract_end_date.day),
        "CONTRACT_END_MONTH": month_number_to_string(contract_end_date.month),
        "CONTRACT_END_YEAR": str(contract_end_date.year),
        # ФИО заказчика из именительного падежа переводится в родительный
        "CUSTOMER": decline_fio(contract.customer.name, "gent"),
        "CUSTOMER_NAME": contract.customer.name,
        "CUSTOMER_PHONE": contract.customer.phone_number,
        "CUSTOMER_EMAIL": contract.customer.email,
        # ФИО слушателя из именительного падежа переводится в дательный
        "STUDENT": decline_fio(contract.student.name, "datv"),
        "STUDENT_PHONE": contract.student.phone_number,
        "COURSE": contract.study_group.name,
        "GRADE": contract.study_group.grade,

        "PASSPORT_SERIAL": contract.customer.passport_number.split(" ")[0],
        "PASSPORT_NUMBER": contract.customer.passport_number.split(" ")[1],
        "PASSPORT_ISSUANCE": contract.customer.passport_issuance,
        "PASSPORT_REGISTRATION": contract.customer.passport_registration,

        "START_DAY": start_date.day,
        "START_MONTH": month_number_to_string(start_date.month),
        "START_YEAR": start_date.year,
        "END_DAY": end_date.day,
        "END_MONTH": month_number_to_string(end_date.month),
        "END_YEAR": end_date.year,

        # "PLACE": "очной" if is_offline else "online",
        # "ADDRESS": "Океанский проспект, 87а." if address else "г. Владивосток, ул. Русская, 46б, 2 этаж.",

        "TOTAL_PRICE": contract.contract_price,
        "TOTAL_PRICE_STRING": get_string_by_number(contract.contract_price) + ' руб.',

        "ADDRESS": contract.address.address,

        "PLACE": "online" if contract.is_online else "очной",

        "LESSONS_PER_WEEK": str(contract.study_group.discipline.lessons_per_week),
        "LESSON_TIME": str(contract.study_group.discipline.lesson_time),
    }
    doc = DocxTemplate('document_management_backend/templates/contract_template.docx')
    doc.render(context)

    f = BytesIO()
    doc.save(f)
    f.seek(0)
    return f

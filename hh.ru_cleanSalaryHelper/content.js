(function() {
    'use strict';

    const salaryDiv = document.querySelector('div[data-qa=vacancy-salary]');
    if (!salaryDiv) return;

    const TAX_RATE = 0.87; // 13% налог

    let salaryMatch = (/от ([\d\s ]+) до ([\d\s ]+) ₽ за месяц, до вычета налогов/g).exec(salaryDiv.innerText);
    if (salaryMatch) {
        const salaries = [salaryMatch[1], salaryMatch[2]].map(salaryStr => {
            const cleanSalary = salaryStr.replace(/[\s ]/g, '');
            return parseInt(cleanSalary);
        });

        if (salaries.some(isNaN)) {
            console.log(`Не получилось получить число из "${salaryMatch[1]}" или "${salaryMatch[2]}".`);
            return;
        }

        const realSalaries = salaries.map(salary =>
            Math.round(salary * TAX_RATE).toLocaleString('ru-RU')
        );

        const realSalaryDiv = document.createElement('div');
        realSalaryDiv.innerHTML = `(от ${realSalaries[0]} до ${realSalaries[1]} ₽ после вычета)`;

        salaryDiv.appendChild(realSalaryDiv);
        return;
    }

    salaryMatch = (/до ([\d\s ]+) ₽ за месяц, до вычета налогов/g).exec(salaryDiv.innerText);
    if (salaryMatch) {
        let salaryStr = salaryMatch[1].replace(/[\s ]/g, '');
        const salary = parseInt(salaryStr);

        if (isNaN(salary)) {
            console.log(`Не получилось получить число из "${salaryStr}".`);
            return;
        }

        const realSalary = Math.round(salary * TAX_RATE);
        const realSalaryDiv = document.createElement('div');
        realSalaryDiv.innerHTML = `(${realSalary.toLocaleString('ru-RU')} ₽ после вычета)`;

        salaryDiv.appendChild(realSalaryDiv);
    }
})();
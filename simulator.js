document.addEventListener('DOMContentLoaded', function () {
    const salary = document.getElementById('salary');
    const results = document.getElementById('results');

    function formatCurrency(value) {
        return value.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
    }

    function calculate() {
        if (!salary) return console.warn('Elemento #salary não encontrado.');
        const vb = parseFloat(salary.value.replace(',', '.'));

        if (!vb || vb <= 0) {
            alert('Por favor, insere um vencimento base válido.');
            return;
        }

        const vbAnual = vb * 14;
        const maxEmpresa = vbAnual * 0.015; // 1.5%
        const contribuicaoColaboradorAnual = maxEmpresa * 2;
        const mensalColaborador = contribuicaoColaboradorAnual / 12;
        const mensalEmpresa = maxEmpresa / 12;
        const totalMensal = mensalColaborador + mensalEmpresa;
        const totalAnual = contribuicaoColaboradorAnual + maxEmpresa;

        const set = (id, value) => {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        };

        set('vbAnual', formatCurrency(vbAnual));
        set('maxEmpresa', formatCurrency(maxEmpresa));
        set('mensalColaborador', formatCurrency(mensalColaborador) + ' /mês');
        set('anualColaborador', formatCurrency(contribuicaoColaboradorAnual) + ' /ano');
        set('mensalEmpresa', formatCurrency(mensalEmpresa) + ' /mês');
        set('anualEmpresa', formatCurrency(maxEmpresa) + ' /ano');
        set('totalMensal', formatCurrency(totalMensal) + ' /mês');
        set('totalAnual', formatCurrency(totalAnual) + ' /ano');

        if (results) results.classList.add('show');
    }

    function reset() {
        if (salary) salary.value = '';
        if (results) results.classList.remove('show');
        if (salary) salary.focus();
    }

    // Expor para onclick inline, se existir
    window.calculate = calculate;
    window.resetSimulator = reset;

    // ligar botão: procura por id ou por botão com texto "calcular"
    const calcBtn =
        document.getElementById('calculateBtn') ||
        document.querySelector('button[data-action="calculate"]') ||
        Array.from(document.querySelectorAll('button')).find(b => /calcular/i.test(b.textContent));

    if (calcBtn) calcBtn.addEventListener('click', calculate);
    else console.warn('Botão de calcular não encontrado — adiciona id="calculateBtn" ao botão ou mantém onclick="calculate()" no HTML.');

    if (salary) {
        salary.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') calculate();
        });
        salary.focus();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    let info = document.getElementById('info');

    infoTable(info);
});

empresa = () => {

    let empresa = [
        {'label': 'Nome da Empresa', 'value': 'ME SALVA BRECHÓ'},
        {'label': 'CNPJ', 'value': '37.980.529/0001-29'},
    ];

    return empresa;
};

infoTable = (select) => {
    let info = empresa();

    select.innerHTML = "";
            
    let title_cliente = m_big_title_h4([{'title': 'Empresa'}], select);
    m_newLine(select);
    m_newLine(select);
    let divisor = m_div([{'class': 'divider'}], select);

    let table = m_table([{}], select);
    let thead = m_thead([{}], table);
    let tbody = m_tbody([{}], table);

    info.map(x => {

        let tr = m_tr([{}], table);
        let th1 = m_th([{'title': x.label}], tr);
        let td2 = m_td([{'title': x.value}], tr);

    });
};
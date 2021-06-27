document.addEventListener('DOMContentLoaded', function () {

    let relatorio = document.getElementById('relatorio');

    reportTable(relatorio);
});

verifyDatas = (select) => {

    let data1 = select.querySelectorAll('#label_data_de_inicio')[0];
    let data2 = select.querySelectorAll('#label_data_final')[0];
    let verify = true;

    if (data1 == '' || data2 == '') {
        alert('Preencha corretamente as datas :(');
        verify = false;
    }

    return verify;

};

showFiltroForm = (select, data) => {

    let col1 = m_div([{ 'class': 'input-field col s6' }], select);
    let input1 = m_input([{ 'class': 'validate', 'type': 'date', 'id': 'label_data_de_inicio' }], col1);
    let label1 = m_label([{ 'for': 'label_data_de_inicio', 'title': 'Data de início' }], col1);

    let col2 = m_div([{ 'class': 'input-field col s6' }], select);
    let input2 = m_input([{ 'class': 'validate', 'type': 'date', 'id': 'label_data_final' }], col2);
    let label2 = m_label([{ 'for': 'label_data_final', 'title': 'Data final' }], col2);

    let center = m_div([{ 'class': 'center' }], select);
    let btn = m_anchor([{ 'class': 'modal-close waves-effect blue waves-grey btn-flat', 'title': 'Ver Relatório', 'id': 'ver_relatorio' }], center);

    let table = m_table([{}], select);
    let valorTotal = m_big_title_h4([{}], null);

    btn.addEventListener('click', x => {

        table.innerHTML = '';
        valorTotal.innerHTML = '';

        let verify = verifyDatas(select);

        if (verify == true) {
            let filtro = [];
            let total = 0;

            data.venda.map((x, pos) => {

                if (input1.value <= formatDate(x.data) && input2.value >= formatDate(x.data)) {
                    filtro[pos] = x;
                }
            });

            let thead = m_thead([{}], table);
            let tbody = m_thead([{}], table);
            let tr1 = m_tr([{}], thead);
            let th1 = m_th([{ 'title': 'Produto' }], tr1);
            let th2 = m_th([{ 'title': 'Cliente' }], tr1);
            let th3 = m_th([{ 'title': 'Valor' }], tr1);

            filtro.map(x => {
                let tr2 = m_tr([{}], thead);
                let td1 = m_td([{}], tr2);
                let td2 = m_td([{ 'title': x.cliente }], tr2);
                let td3 = m_td([{ 'title': 'R$' + x.valor }], tr2);

                let produtos = '';

                data.produto[x.id].map(y => {
                    produtos += y.codigo + ' - ' + y.descricao + "<br />";
                });

                td1.innerHTML = produtos;

                total += parseFloat(x.valor);

            });

            valorTotal.textContent = 'Valor Total: R$' + total;
            select.appendChild(valorTotal);
        }
    });

};

tableDiario = (select, data) => {

    let total = 0;
    let agora = new Date();
    let vendas_diarias = [];

    data.venda.map((x, pos) => {

        if (formatDate(agora) === formatDate(x.data)) {
            vendas_diarias[pos] = x;
        }
    });

    let table = m_table([{}], select);
    let thead = m_thead([{}], table);
    let tbody = m_thead([{}], table);
    let tr1 = m_tr([{}], thead);
    let th1 = m_th([{ 'title': 'Produto' }], tr1);
    let th2 = m_th([{ 'title': 'Cliente' }], tr1);
    let th3 = m_th([{ 'title': 'Valor' }], tr1);

    vendas_diarias.map(x => {
        let tr2 = m_tr([{}], thead);
        let td1 = m_td([{}], tr2);
        let td2 = m_td([{ 'title': x.cliente }], tr2);
        let td3 = m_td([{ 'title': 'R$' + x.valor }], tr2);
        let produtos = '';

        data.produto[x.id].map(y => {
            produtos += y.codigo + ' - ' + y.descricao + "<br />";
        });

        td1.innerHTML = produtos;

        total += parseFloat(x.valor);

    });

    m_newLine(select);

    let valorTotal = m_big_title_h4([{ 'title': 'Valor Total: R$' + total }], select);

};

tableMes = (select, data) => {

    let total = 0;
    let agora = new Date();
    let vendas_mensais = [];

    data.venda.map((x, pos) => {

        let mes = new Date(x.data);

        if (agora.getMonth() === mes.getMonth()) {
            vendas_mensais[pos] = x;
        }
    });

    let table = m_table([{}], select);
    let thead = m_thead([{}], table);
    let tbody = m_thead([{}], table);
    let tr1 = m_tr([{}], thead);
    let th1 = m_th([{ 'title': 'Produto' }], tr1);
    let th2 = m_th([{ 'title': 'Cliente' }], tr1);
    let th3 = m_th([{ 'title': 'Valor' }], tr1);

    vendas_mensais.map(x => {
        let tr2 = m_tr([{}], thead);
        let td1 = m_td([{}], tr2);
        let td2 = m_td([{ 'title': x.cliente }], tr2);
        let td3 = m_td([{ 'title': 'R$' + x.valor }], tr2);

        let produtos = '';

        data.produto[x.id].map(y => {
            produtos += y.codigo + ' - ' + y.descricao + "<br />";
        });

        td1.innerHTML = produtos;

        total += parseFloat(x.valor);

    });

    m_newLine(select);

    let valorTotal = m_big_title_h4([{ 'title': 'Valor Total: R$' + total }], select);

};

reportTable = (select) => {

    let formData = new FormData();
    let request = new XMLHttpRequest();

    //formData.append("id_protocolo", id_protocolo);

    request.open("POST", "model/response/venda.php?op=list&class=Venda");

    request.onloadstart = function () {
        preLoader(select);
    };

    request.onreadystatechange = function () {//Call a function when the state changes.
        if (request.readyState == 4 && request.status == 200) {
            let response = JSON.parse(this.responseText);

            select.innerHTML = "";

            let title_relatorio = m_big_title_h4([{ 'title': 'Relatórios' }], select);
            m_newLine(select);
            m_newLine(select);
            let divisor = m_div([{ 'class': 'divider' }], select);

            if (response.object.venda != null && response.row > 0) {

                let row1 = m_div([{ 'class': 'row' }], select);
                let col1 = m_div([{ 'class': 'col s12' }], row1);
                let col2 = m_div([{ 'class': 'col s12', 'id': 'diario' }], row1);
                let col3 = m_div([{ 'class': 'col s12', 'id': 'mes' }], row1);
                let col4 = m_div([{ 'class': 'col s12', 'id': 'filtrar' }], row1);
                let tabs = m_ul([{ 'class': 'tabs' }], col1);
                let li1 = m_li([{ 'class': 'tab col s3' }], tabs);
                let li2 = m_li([{ 'class': 'tab col s3' }], tabs);
                let li3 = m_li([{ 'class': 'tab col s3' }], tabs);
                let a1 = m_anchor([{ 'href': '#diario', 'title': 'Diário' }], li1);
                let a2 = m_anchor([{ 'href': '#mes', 'title': 'Este Mês' }], li2);
                let a3 = m_anchor([{ 'href': '#filtrar', 'title': 'Filtrar' }], li3);

                tableDiario(col2, response.object);
                tableMes(col3, response.object);
                showFiltroForm(col4, response.object);

                var instance = M.Tabs.init(tabs);

            } else {
                let panel = m_div([{ 'class': 'card-panel yellow lighten-2', 'title': 'Nenhuma venda cadastrada para gerar relatórios :(' }], select);
            }
        }
    };

    request.send();

};
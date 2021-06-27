document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
    let venda = document.getElementById('venda');
    saleForm(venda);
});

realizaVenda = (formulario_venda) => {
    let r = confirm("Deseja concluir essa venda?");

    if (r === true) {

        let cliente_id = formulario_venda.querySelectorAll('#label_cliente')[0];
        let pagamento_id = formulario_venda.querySelectorAll('#label_pagamento')[0];
        let data = formulario_venda.querySelectorAll('#label_data')[0];
        let valor = formulario_venda.querySelectorAll('#label_valor')[0];
        let obs = formulario_venda.querySelectorAll('#label_obs')[0];

        let produtos = document.querySelectorAll('#produtos-content')[0];

        let array_produtos = Array.prototype.slice.call(produtos.childNodes);

        let formData = new FormData();
        let request = new XMLHttpRequest();

        formData.append('venda[cliente_id]', cliente_id.value);
        formData.append('venda[pagamento_id]', pagamento_id.value);
        formData.append('venda[data]', data.value);
        formData.append('venda[valor]', valor.value);
        formData.append('venda[obs]', obs.value);

        array_produtos.map(x => {

            formData.append('produtos[]', x.dataset.id);

        });

        request.open("POST", "model/response/venda.php?op=add&class=Venda");

        request.onreadystatechange = function () {//Call a function when the state changes.
            if (request.readyState == 4 && request.status == 200) {
                let response = JSON.parse(this.responseText);
                if (response.object != null && response.row > 0) {
                    alert('Venda realizada com sucesso! :)');
                    window.location.href = '?page=venda';
                }
            }
        }

        request.send(formData);

    }
}

delProduto = (produto_id) => {
    let produtos = document.querySelectorAll('#produtos-content')[0];
    let element = produtos.querySelectorAll('#id-' + produto_id)[0];
    produtos.removeChild(element);
}

addProduto = (produto_id) => {
    let produtos = document.querySelectorAll('#produtos-content')[0];

    let div = m_div([{ 'id': 'id-' + produto_id, 'data': 'id=' + produto_id }], produtos);
};

modalAddProduto = (select) => {
    select.innerHTML = "";

    let modal_content = m_div([{ 'class': 'modal-content' }], select);
    let modal_footer = m_div([{ 'class': 'modal-footer' }], select);
    let title_h4 = m_big_title_h4([{ 'title': 'Produto' }], modal_content);
    let p = m_p([{}], modal_content);
    let btn_close = m_anchor([{ 'class': 'modal-close waves-effect waves-grey btn-flat', 'href': '#', 'title': 'Cancelar' }], modal_footer);
    let btn_add_edit = m_anchor([{ 'class': 'waves-effect waves-green green btn-flat', 'href': '#', 'title': 'Adicionar', 'id': 'add_edit_venda' }], modal_footer);
    let row1 = m_div([{ 'class': 'row' }], p);

    let formData = new FormData();
    let request = new XMLHttpRequest();

    request.open("POST", "model/response/venda.php?op=list&class=Produto");

    let produtos = document.querySelectorAll('#produtos-content')[0];

    if (produtos.hasChildNodes() == true) {

        var array = Array.prototype.slice.call(produtos.childNodes);

        array.map((x, i) => {
            formData.append('id' + i, x.dataset.id);
        });

    }

    request.onreadystatechange = function () {//Call a function when the state changes.
        if (request.readyState == 4 && request.status == 200) {
            let response = JSON.parse(this.responseText);
            if (response.object != null && response.row > 0) {

                let col2 = m_div([{ 'class': 'input-field col s12' }], row1);
                let input2 = m_select([{ 'options': response.object != null ? response.object.map(x => ({ 'value': x.id, 'label': x.codigo + ' - ' + x.descricao })) : [], 'id': 'label_produto' }], col2);
                let label2 = m_label([{ 'for': 'label_produto', 'title': 'Produto' }], col2);

                var elems = document.querySelectorAll('select');
                var instances = M.FormSelect.init(elems);

                btn_add_edit.addEventListener('click', x => {
                    addProduto(input2.value);
                    let modal_add_produto = document.getElementById('modal_add_produto');
                    var instance = M.Modal.getInstance(modal_add_produto);
                    instance.close();
                    let produto_contents = document.getElementById('p-content');
                    tableProdutos(produto_contents);

                    if (response.row == 1) {
                        let btn_add_produto = document.getElementById('adicionar_produto');
                        btn_add_produto.classList.add('disabled');
                    } else {

                        let btn_add_produto = document.getElementById('adicionar_produto');

                        if (btn_add_edit.classList.contains('disabled')) {
                            btn_add_produto.classList.remove('disabled');
                        }
                    }

                });

            }
        }
    };

    request.send(formData);

}

tableProdutos = (select) => {
    select.innerHTML = '';
    let produtos = document.querySelectorAll('#produtos-content')[0];
    let btn_venda = document.querySelectorAll('#realizar_venda')[0];
    let title_venda = m_big_title_h4([{ 'title': 'Produtos' }], select);
    m_newLine(select);
    let divisor = m_div([{ 'class': 'divider' }], select);
    m_newLine(select);

    if (produtos.hasChildNodes() == false) {
        let panel = m_div([{ 'class': 'card-panel yellow lighten-2', 'title': 'Nenhum produto adicionado' }], select);
        btn_venda.classList.add('disabled');
        let valor_sujerido = document.getElementById('label_valor');
        let label_valor_sujerido = document.getElementById('label_label_valor');
        label_valor_sujerido.classList.add('active');
        valor_sujerido.value = 0.0;

    } else {

        if (btn_venda.classList.contains('disabled')) {
            btn_venda.classList.remove('disabled');
        }

        var array = Array.prototype.slice.call(produtos.childNodes);

        let formData = new FormData();
        let request = new XMLHttpRequest();

        request.open("POST", "model/response/produto.php?op=list&class=Produto");

        request.onreadystatechange = function () {//Call a function when the state changes.
            if (request.readyState == 4 && request.status == 200) {
                let response = JSON.parse(this.responseText);
                if (response.object != null && response.row > 0) {

                    let todos_produtos = [];

                    response.object.map(x => {

                        todos_produtos[x.id] = x;

                    });

                    let table = m_table([{}], select);
                    let thead = m_thead([{}], table);
                    let tbody = m_thead([{}], table);
                    let tr_thead = m_tr([{}], thead);
                    let th1 = m_th([{ 'title': 'Código' }], tr_thead);
                    let th2 = m_th([{ 'title': 'Descrição' }], tr_thead);
                    let th3 = m_th([{ 'title': 'Ação' }], tr_thead);
                    let valor_sujerido = document.getElementById('label_valor');
                    let label_valor_sujerido = document.getElementById('label_label_valor');
                    label_valor_sujerido.classList.add('active');
                    valor_sujerido.value = 0.0;
                    array.map(x => {

                        let tr_tbody = m_tr([{}], tbody);
                        let td1 = m_td([{ 'title': todos_produtos[x.dataset.id].codigo }], tr_tbody);
                        let td2 = m_td([{ 'title': todos_produtos[x.dataset.id].descricao }], tr_tbody);
                        let td3 = m_td([{}], tr_tbody);
                        let btn_delete = m_anchor([{ 'title': 'Apagar ', 'class': 'red waves-effect waves-light btn-small btn_del', 'id': x.dataset.id }], td3);
                        valor_sujerido.value = parseFloat(valor_sujerido.value) + parseFloat(todos_produtos[x.dataset.id].preco);

                    });

                    let btn_del = document.querySelectorAll('.btn_del');

                    var arr3 = Array.prototype.slice.call(btn_del);

                    arr3.map(x => {

                        x.addEventListener('click', (y) => {

                            let element_id = y.target.id;

                            if (y.target.nodeName == 'I') {
                                element_id = y.target.parentNode.id;
                            }

                            delProduto(element_id);

                            let produto_contents = document.getElementById('p-content');
                            tableProdutos(produto_contents);

                        });

                    });

                }
            }
        }

        request.send(formData);
    }

    let btn_add_produto = m_anchor([{ 'title': 'Adicionar Produto', 'class': 'waves-effect waves-light btn-large', 'id': 'adicionar_produto' }], select);

    btn_add_produto.addEventListener('click', x => {
        let modal_add_produto = document.getElementById('modal_add_produto');
        modalAddProduto(modal_add_produto);
        var instance = M.Modal.getInstance(modal_add_produto);
        instance.open();

    });
};

saleForm = (select) => {
    select.innerHTML = "";

    let title_venda = m_big_title_h4([{ 'title': 'Venda' }], select);
    m_newLine(select);
    let divisor = m_div([{ 'class': 'divider' }], select);
    m_newLine(select);


    let formData = new FormData();
    let request = new XMLHttpRequest();

    request.open("POST", "model/response/venda.php?op=list&class=Misc");

    request.onreadystatechange = function () {//Call a function when the state changes.
        if (request.readyState == 4 && request.status == 200) {
            let response = JSON.parse(this.responseText);
            if (response.object != null && response.row > 0) {

                let row1 = m_div([{ 'class': 'row' }], select);
                let col1 = m_div([{ 'class': 'col s12' }], row1);
                let row2 = m_div([{ 'class': 'row' }], col1);

                let col2 = m_div([{ 'class': 'input-field col s6' }], row2);
                let input2 = m_select([{ 'options': response.object.cliente != null ? response.object.cliente.map(x => ({ 'value': x.id, 'label': x.nome })) : [], 'id': 'label_cliente' }], col2);
                let label2 = m_label([{ 'for': 'label_cliente', 'title': 'Cliente' }], col2);

                let col3 = m_div([{ 'class': 'input-field col s6' }], row2);
                let input3 = m_input([{ 'class': 'validate', 'type': 'number', 'id': 'label_valor', 'step': '0.01' }], col3);
                let label3 = m_label([{ 'for': 'label_valor', 'title': 'Valor Sujerido', 'id': 'label_label_valor' }], col3);

                let col4 = m_div([{ 'class': 'input-field col s6' }], row2);
                let input4 = m_select([{ 'options': response.object.pagamento != null ? response.object.pagamento.map(x => ({ 'value': x.id, 'label': x.nome })) : [], 'id': 'label_pagamento' }], col4);
                let label4 = m_label([{ 'for': 'label_pagamento', 'title': 'Pagamento' }], col4);

                let col5 = m_div([{ 'class': 'input-field col s6' }], row2);
                let input5 = m_input([{ 'class': 'validate', 'type': 'date', 'id': 'label_data' }], col5);
                let label5 = m_label([{ 'for': 'label_data', 'title': 'Data' }], col5);

                let col6 = m_div([{ 'class': 'input-field col s6' }], row2);
                let input6 = m_textarea([{ 'class': 'materialize-textarea', 'type': 'text', 'id': 'label_obs' }], col6);
                let label6 = m_label([{ 'for': 'label_obs', 'title': 'Observação' }], col6);

                let produto_contents = m_div([{ 'id': 'p-content' }], select);

                var elems = document.querySelectorAll('select');
                var instances = M.FormSelect.init(elems);

                m_newLine(select);
                let btn_realiza_venda = m_anchor([{ 'title': 'Realizar Venda', 'class': 'waves-effect waves-light btn-large', 'id': 'realizar_venda' }], select);

                tableProdutos(produto_contents);

                btn_realiza_venda.addEventListener('click', x => {

                    realizaVenda(row2);

                });

            }
        }
    };

    request.send();

};
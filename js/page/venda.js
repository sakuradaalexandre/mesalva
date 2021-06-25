document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    let venda = document.getElementById('venda');
    saleTable(venda);
});

delVenda = (id) => {
    let formData = new FormData();
    let request = new XMLHttpRequest();

    formData.append('id', id);

    request.open("POST", "model/response/venda.php?op=delete&class=Venda");

    request.onreadystatechange = function () {//Call a function when the state changes.
        if (request.readyState == 4 && request.status == 200) {
            let response = JSON.parse(this.responseText);
            if (response.object != null && response.row > 0) {
                alert('Venda excluída com sucesso! :)');
                location.reload();
            }
        }
    }

    request.send(formData);

};

getValor = (id, select) => {

    let formData = new FormData();
    let request = new XMLHttpRequest();

    formData.append('id', id);

    request.open("POST", "model/response/venda.php?op=view&class=Valor");

    request.onreadystatechange = function () {//Call a function when the state changes.
        if (request.readyState == 4 && request.status == 200) {
            let response = JSON.parse(this.responseText);
            if (response.object != null && response.row > 0) {
                select.value = response.object.preco;
                select.parentNode.querySelectorAll('label')[0].classList.add('active');
            }
        }
    }

    request.send(formData);

};

modalViewVenda = (select, id) => {

    select.innerHTML = "";

    let modal_content = m_div([{ 'class': 'modal-content' }], select);
    let modal_footer = m_div([{ 'class': 'modal-footer' }], select);
    let title_h4 = m_big_title_h4([{ 'title': 'Venda' }], modal_content);
    let p = m_p([{}], modal_content);
    let btn_recibo = m_anchor([{ 'class': 'waves-effect waves-grey btn-flat green', 'title': 'Recibo', 'target': '_blank' }], modal_footer);
    let btn_close = m_anchor([{ 'class': 'modal-close waves-effect waves-grey btn-flat', 'href': '#', 'title': 'Fechar' }], modal_footer);
    let row1 = m_div([{ 'class': 'row' }], p);

    let formData = new FormData();
    let request = new XMLHttpRequest();

    formData.append('id', id);

    request.open("POST", "model/response/venda.php?op=view&class=Venda");

    request.onreadystatechange = function () {//Call a function when the state changes.
        if (request.readyState == 4 && request.status == 200) {
            let response = JSON.parse(this.responseText);
            if (response.object != null && response.row > 0) {

                let table = m_table([{}], p);
                let tbody = m_tbody([{}], table);

                let tr1 = m_tr([{}], tbody);
                let tr2 = m_tr([{}], tbody);
                let tr3 = m_tr([{}], tbody);
                let tr4 = m_tr([{}], tbody);
                let tr5 = m_tr([{}], tbody);
                let tr6 = m_tr([{}], tbody);

                btn_recibo.href = 'view/ver_recibo.php?id=' + response.object.id;

                let td1 = m_td([{ 'title': 'Cliente' }], tr1);
                let td2 = m_td([{ 'title': response.object.cliente }], tr1);

                let td3 = m_td([{ 'title': 'Produto' }], tr2);
                let td4 = m_td([{ 'title': response.object.produto + ' - ' + response.object.descricao }], tr2);

                let td5 = m_td([{ 'title': 'Valor' }], tr3);
                let td6 = m_td([{ 'title': 'R$ ' + response.object.valor }], tr3);

                let td7 = m_td([{ 'title': 'Pagamento' }], tr4);
                let td8 = m_td([{ 'title': response.object.pagamento }], tr4);

                let data = new Date(response.object.data);

                let td9 = m_td([{ 'title': 'Data' }], tr5);
                let td10 = m_td([{ 'title': formatDate(data) }], tr5);

                let td11 = m_td([{ 'title': 'Observação' }], tr6);
                let td12 = m_td([{ 'title': response.object.obs }], tr6);
            }
        }
    }

    request.send(formData);

};

realizarVenda = (select) => {

    let btn_add_edit = select.querySelectorAll('#add_edit_venda')[0];
    let modal_content = select.querySelectorAll('.modal-content')[0];

    let cliente = modal_content.querySelectorAll('#label_cliente')[0];
    let produto = modal_content.querySelectorAll('#label_produto')[0];
    let valor = modal_content.querySelectorAll('#label_valor')[0];
    let pagamento = modal_content.querySelectorAll('#label_pagamento')[0];
    let data = modal_content.querySelectorAll('#label_data')[0];
    let obs = modal_content.querySelectorAll('#label_obs')[0];

    if (typeof (btn_add_edit) != 'undefined') {

        btn_add_edit.addEventListener('click', x => {

            let formData = new FormData();
            let request = new XMLHttpRequest();

            let edit = x.target.dataset.edit;

            if (cliente.value == '' || produto.value == '') {
                alert('É necessário cadastrar pelo menos 1 cliente e 1 produto precificada e não vendida para prosseguir com a venda!');
            } else {

                let r = confirm("Deseja cadastrar essas informações?");

                if (r === true) {

                    formData.append('cliente_id', cliente.value);
                    formData.append('produto_id', produto.value);
                    formData.append('valor', valor.value);
                    formData.append('pagamento_id', pagamento.value);
                    formData.append('data', data.value);
                    formData.append('obs', obs.value);

                    if (edit == 1) {
                        let id = x.target.dataset.id;
                        formData.append('id', id);
                        request.open("POST", "model/response/venda.php?op=edit&class=Venda");
                    } else {
                        request.open("POST", "model/response/venda.php?op=add&class=Venda");
                    }

                    request.onreadystatechange = function () {//Call a function when the state changes.
                        if (request.readyState == 4 && request.status == 200) {
                            let response = JSON.parse(this.responseText);
                            if (response.object != null && response.row > 0) {

                                if (edit == 1) {
                                    alert('Atualização realizada com sucesso! :)');
                                } else {
                                    alert('Cadastro realizado com sucesso! :)');
                                }

                                location.reload();

                            } else {
                                alert('Por algum motivo não foi possível processar :(');
                            }
                        }
                    };

                    request.send(formData);
                }

            }

        });

    }

}

// modalSearchCliente = (select) => {
//     select.innerHTML = "";

//     let modal_content = m_div([{ 'class': 'modal-content' }], select);
//     let modal_footer = m_div([{ 'class': 'modal-footer' }], select);
//     let title_h4 = m_big_title_h4([{ 'title': 'Venda' }], modal_content);
//     let p = m_p([{}], modal_content);
//     let btn_close = m_anchor([{ 'class': 'modal-close waves-effect waves-grey btn-flat', 'href': '#', 'title': 'Cancelar' }], modal_footer);
//     //let btn_add_edit = m_anchor([{ 'class': 'waves-effect waves-green green btn-flat', 'href': '#', 'title': edit == 0 ? 'Adicionar' : 'Atualizar', 'id': 'add_edit_venda', 'data': `id=${id};edit=${edit}` }], modal_footer);
//     let row1 = m_div([{ 'class': 'row' }], p);
// }

modalAddEditVenda = (select, id = null, edit = 0) => {

    select.innerHTML = "";

    let modal_content = m_div([{ 'class': 'modal-content' }], select);
    let modal_footer = m_div([{ 'class': 'modal-footer' }], select);
    let title_h4 = m_big_title_h4([{ 'title': 'Venda' }], modal_content);
    let p = m_p([{}], modal_content);
    let btn_close = m_anchor([{ 'class': 'modal-close waves-effect waves-grey btn-flat', 'href': '#', 'title': 'Cancelar' }], modal_footer);
    let btn_add_edit = m_anchor([{ 'class': 'waves-effect waves-green green btn-flat', 'href': '#', 'title': edit == 0 ? 'Adicionar' : 'Atualizar', 'id': 'add_edit_venda', 'data': `id=${id};edit=${edit}` }], modal_footer);
    let row1 = m_div([{ 'class': 'row' }], p);

    let formData = new FormData();
    let request = new XMLHttpRequest();

    edit == 1 ? formData.append('id', id) : null;

    request.open("POST", "model/response/venda.php?op=list&class=Misc");

    request.onreadystatechange = function () {//Call a function when the state changes.
        if (request.readyState == 4 && request.status == 200) {
            let response = JSON.parse(this.responseText);
            if (response.object != null && response.row > 0) {

                let col1 = m_div([{ 'class': 'input-field col s6' }], row1);
                let input1 = m_select([{ 'options': response.object.cliente != null ? response.object.cliente.map(x => ({ 'value': x.id, 'label': x.nome })) : [], 'id': 'label_cliente' }], col1);
                let label1 = m_label([{ 'for': 'label_cliente', 'title': 'Cliente' }], col1);

                let col2 = m_div([{ 'class': 'input-field col s6' }], row1);
                let input2 = m_select([{ 'options': response.object.produto != null ? response.object.produto.map(x => ({ 'value': x.id, 'label': x.codigo + ' - ' + x.descricao })) : [], 'id': 'label_produto' }], col2);
                let label2 = m_label([{ 'for': 'label_produto', 'title': 'Produto' }], col2);

                let col3 = m_div([{ 'class': 'input-field col s6' }], row1);
                let input3 = m_input([{ 'class': 'validate', 'type': 'number', 'id': 'label_valor', 'step': '0.01' }], col3);
                let label3 = m_label([{ 'for': 'label_valor', 'title': 'Valor' }], col3);

                let col4 = m_div([{ 'class': 'input-field col s6' }], row1);
                let input4 = m_select([{ 'options': response.object.pagamento != null ? response.object.pagamento.map(x => ({ 'value': x.id, 'label': x.nome })) : [], 'id': 'label_pagamento' }], col4);
                let label4 = m_label([{ 'for': 'label_pagamento', 'title': 'Pagamento' }], col4);

                let col5 = m_div([{ 'class': 'input-field col s6' }], row1);
                let input5 = m_input([{ 'class': 'validate', 'type': 'date', 'id': 'label_data' }], col5);
                let label5 = m_label([{ 'for': 'label_data', 'title': 'Data' }], col5);

                let col6 = m_div([{ 'class': 'input-field col s6' }], row1);
                let input6 = m_textarea([{ 'class': 'materialize-textarea', 'type': 'text', 'id': 'label_obs' }], col6);
                let label6 = m_label([{ 'for': 'label_obs', 'title': 'Observação' }], col6);

                let col7 = m_div([{ 'class': 'input-field col s6' }], row1);

                //------------------------------------------


                // let btn_add_cli = m_anchor([{ 'class': 'waves-effect waves-green green btn-flat', 'href': '#', 'title': 'ADD Cliente', 'id': 'search_cliente' }], col7);

                // btn_add_cli.addEventListener('click', x => {

                //     let modal_search_cliente = document.getElementById('modal_search_cliente');
                //     modalSearchCliente(modal_addedit_venda);
                //     var instances = M.Modal.init(modal_search_cliente, {opacity : 0});
                //     var instance = M.Modal.getInstance(modal_search_cliente);
                //     instance.open();

                //     //alert('lala');

                // });

                //------------------------------------------


                var elems = document.querySelectorAll('select');
                var instances = M.FormSelect.init(elems);

                if (edit == 1) {

                    let formData2 = new FormData();
                    let request2 = new XMLHttpRequest();

                    formData2.append('id', id);

                    request2.open("POST", "model/response/venda.php?op=view&class=Venda");

                    request2.onreadystatechange = function () {//Call a function when the state changes.
                        if (request2.readyState == 4 && request2.status == 200) {
                            let response2 = JSON.parse(this.responseText);
                            if (response2.object != null && response2.row > 0) {

                                input1.value = response2.object.cliente_id;

                                input2.value = response2.object.produto_id;

                                label3.classList.add('active');
                                input3.value = response2.object.valor;

                                input4.value = response2.object.pagamento_id;

                                let data = new Date(response2.object.data);
                                input5.value = formatDate(data);

                                M.FormSelect.init(elems);

                            }
                        }
                    }

                    request2.send(formData2);

                } else {
                    getValor(input2.value, input3);

                    input2.addEventListener('change', x => {
                        getValor(x.target.value, input3);
                    });
                }

                realizarVenda(select);

            }
        }
    };

    edit == 1 ? request.send(formData) : request.send();

};

saleTable = (select) => {

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

            let title_venda = m_big_title_h4([{ 'title': 'Venda' }], select);
            let btn_add = m_anchor([{ 'title': 'Adicionar ', 'class': 'waves-effect waves-light btn-large', 'id': 'modal_add_venda' }], select);
            let btn_add_icon = m_icon([{ 'class': 'fas fa-plus' }], btn_add);
            m_newLine(select);
            m_newLine(select);
            let divisor = m_div([{ 'class': 'divider' }], select);

            if (response.object != null && response.row > 0) {

                let table = m_table([{}], select);
                let thead = m_thead([{}], table);
                let tbody = m_tbody([{}], table);
                let tr1 = m_tr([{}], thead);
                let th1 = m_th([{ 'title': 'Código' }], tr1);
                let th2 = m_th([{ 'title': 'Produto' }], tr1);
                let th3 = m_th([{ 'title': 'Cliente' }], tr1);
                let th4 = m_th([{ 'title': 'Ações' }], tr1);

                response.object.map(x => {

                    let tr2 = m_tr([{}], tbody);
                    let td1 = m_td([{ 'title': x.codigo }], tr2);
                    let td2 = m_td([{ 'title': x.produto }], tr2);
                    let td3 = m_td([{ 'title': x.cliente }], tr2);
                    let td4 = m_td([{}], tr2);
                    let btn_view = m_anchor([{ 'title': 'Ver ', 'class': 'waves-effect waves-light btn-small btn_view', 'id': x.id }], td4);
                    let btn_view_icon = m_icon([{ 'class': 'fas fa-folder' }], btn_view);
                    m_space(td4);
                    let btn_edit = m_anchor([{ 'title': 'Editar ', 'class': 'waves-effect waves-light btn-small btn_edit', 'id': x.id }], td4);
                    let btn_edit_icon = m_icon([{ 'class': 'fas fa-edit' }], btn_edit);
                    m_space(td4);
                    let btn_del = m_anchor([{ 'title': 'Apagar ', 'class': 'red waves-effect waves-light btn-small btn_del', 'id': x.id }], td4);
                    let btn_del_icon = m_icon([{ 'class': 'fas fa-trash-alt' }], btn_del);

                });

                let btn_view = document.querySelectorAll('.btn_view');
                let btn_edit = document.querySelectorAll('.btn_edit');
                let btn_del = document.querySelectorAll('.btn_del');

                var arr = Array.prototype.slice.call(btn_view);
                var arr2 = Array.prototype.slice.call(btn_edit);
                var arr3 = Array.prototype.slice.call(btn_del);

                arr.map(x => {

                    x.addEventListener('click', y => {

                        let element_id = y.target.id;

                        if (y.target.nodeName == 'I') {
                            element_id = y.target.parentNode.id;
                        }

                        let modal_view_venda = document.getElementById('modal_view_venda');
                        modalViewVenda(modal_view_venda, element_id);
                        var instance = M.Modal.getInstance(modal_view_venda);
                        instance.open();

                    });

                });

                arr2.map(x => {

                    x.addEventListener('click', (y) => {

                        let element_id = y.target.id;

                        if (y.target.nodeName == 'I') {
                            element_id = y.target.parentNode.id;
                        }

                        let modal_addedit_venda = document.getElementById('modal_addedit_venda');
                        modalAddEditVenda(modal_addedit_venda, element_id, 1);
                        var instance = M.Modal.getInstance(modal_addedit_venda);
                        instance.open();

                    });

                });

                arr3.map(x => {

                    x.addEventListener('click', (y) => {

                        let element_id = y.target.id;

                        if (y.target.nodeName == 'I') {
                            element_id = y.target.parentNode.id;
                        }

                        let r = confirm("Deseja excluir esse cliente?");

                        if (r === true) {
                            delVenda(element_id);
                        }

                    });

                });

            } else {
                let panel = m_div([{ 'class': 'card-panel yellow lighten-2', 'title': 'Nenhuma venda realizada :(' }], select);
            }

            btn_add.addEventListener('click', x => {

                let modal_addedit_venda = document.getElementById('modal_addedit_venda');
                modalAddEditVenda(modal_addedit_venda, null, 0);
                var instance = M.Modal.getInstance(modal_addedit_venda);
                instance.open();

            });
        }
    };

    request.send();

};
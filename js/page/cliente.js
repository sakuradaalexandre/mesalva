document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    let cliente = document.getElementById('cliente');
    clientTable(cliente);
});

modalViewCliente = (select, id) => {

    select.innerHTML = "";

    let modal_content = m_div([{ 'class': 'modal-content' }], select);
    let modal_footer = m_div([{ 'class': 'modal-footer' }], select);
    let title_h4 = m_big_title_h4([{ 'title': 'Cliente' }], modal_content);
    let p = m_p([{}], modal_content);
    let btn_close = m_anchor([{ 'class': 'modal-close waves-effect waves-grey btn-flat', 'href': '#', 'title': 'Fechar' }], modal_footer);
    let row1 = m_div([{ 'class': 'row' }], p);

    let formData = new FormData();
    let request = new XMLHttpRequest();

    formData.append('id', id);

    request.open("POST", "model/response/cliente.php?op=view&class=Cliente");

    request.onreadystatechange = function () {//Call a function when the state changes.
        if (request.readyState == 4 && request.status == 200) {
            let response = JSON.parse(this.responseText);
            if (response.object != null && response.row > 0) {

                let table = m_table([{}], p);
                let tbody = m_tbody([{}], table);

                let tr16 = m_tr([{}], tbody);
                let tr1 = m_tr([{}], tbody);
                let tr2 = m_tr([{}], tbody);
                let tr3 = m_tr([{}], tbody);
                let tr4 = m_tr([{}], tbody);
                let tr5 = m_tr([{}], tbody);
                let tr6 = m_tr([{}], tbody);
                let tr7 = m_tr([{}], tbody);
                let tr8 = m_tr([{}], tbody);
                let tr14 = m_tr([{}], tbody);
                let tr15 = m_tr([{}], tbody);
                let tr9 = m_tr([{}], tbody);
                let tr10 = m_tr([{}], tbody);
                let tr11 = m_tr([{}], tbody);
                let tr12 = m_tr([{}], tbody);
                let tr13 = m_tr([{}], tbody);

                let td29 = m_td([{ 'title': 'Código' }], tr16);
                let td30 = m_td([{ 'title': response.object.codigo }], tr16);

                let td1 = m_td([{ 'title': 'Nome' }], tr1);
                let td2 = m_td([{ 'title': response.object.nome }], tr1);

                let td3 = m_td([{ 'title': 'Email' }], tr2);
                let td4 = m_td([{ 'title': response.object.email }], tr2);

                let td5 = m_td([{ 'title': 'Endereço' }], tr3);
                let td6 = m_td([{ 'title': response.object.endereco }], tr3);

                let td7 = m_td([{ 'title': 'Telefone' }], tr4);
                let td8 = m_td([{ 'title': response.object.telefone }], tr4);

                let td9 = m_td([{ 'title': 'Instagram' }], tr5);
                let td10 = m_td([{ 'title': response.object.instagram }], tr5);

                let td25 = m_td([{ 'title': 'Informações Adicionais' }], tr6);
                let td26 = m_td([{ 'title': response.object.obs }], tr6);

                let td11 = m_td([{ 'title': 'Data de Nascimento' }], tr7);
                let td12 = m_td([{ 'title': viewDate(response.object.data_nascimento) }], tr7);

                let td13 = m_td([{ 'title': 'Fornecedor' }], tr8);
                let td14 = m_td([{ 'title': response.object.fornecedor == 0 ? 'Não' : 'Sim' }], tr8);

                if (response.object.fornecedor == 1) {

                    let td27 = m_td([{ 'title': 'Código do Fornecedor' }], tr15);
                    let td28 = m_td([{ 'title': response.object.fornecedor_cod }], tr15);

                    let td25 = m_td([{ 'title': 'CPF' }], tr14);
                    let td26 = m_td([{ 'title': response.object.documento }], tr14);

                    let td15 = m_td([{ 'title': 'Recurso' }], tr9);
                    let td16 = m_td([{ 'title': 'R$ ' + response.object.recurso }], tr9);

                    let td17 = m_td([{ 'title': 'Pix' }], tr10);
                    let td18 = m_td([{ 'title': response.object.pix }], tr10);

                    let td19 = m_td([{ 'title': 'Banco' }], tr11);
                    let td20 = m_td([{ 'title': response.object.banco }], tr11);

                    let td21 = m_td([{ 'title': 'Agência' }], tr12);
                    let td22 = m_td([{ 'title': response.object.ag }], tr12);

                    let td23 = m_td([{ 'title': 'Conta Corrente' }], tr13);
                    let td24 = m_td([{ 'title': response.object.cc }], tr13);

                }
            }
        }
    }

    request.send(formData);

};

modalAddEditCliente = (select, id = null, edit = 0) => {

    select.innerHTML = "";

    let modal_content = m_div([{ 'class': 'modal-content' }], select);
    let modal_footer = m_div([{ 'class': 'modal-footer' }], select);
    let title_h4 = m_big_title_h4([{ 'title': 'Cliente' }], modal_content);
    let p = m_p([{}], modal_content);
    let btn_close = m_anchor([{ 'class': 'modal-close waves-effect waves-grey btn-flat', 'href': '#', 'title': 'Cancelar' }], modal_footer);
    let btn_add_edit = m_anchor([{ 'class': 'waves-effect waves-green green btn-flat', 'href': '#', 'title': edit == 0 ? 'Adicionar' : 'Atualizar', 'id': 'add_edit_cliente', 'data': `id=${id};edit=${edit}` }], modal_footer);
    let row1 = m_div([{ 'class': 'row' }], p);

    let col18 = m_div([{ 'class': 'input-field col s6' }], row1);
    let input18 = m_input([{ 'class': 'validate', 'type': 'text', 'id': 'label_codigo' }], col18);
    let label18 = m_label([{ 'for': 'label_codigo', 'title': 'Código' }], col18);

    let col1 = m_div([{ 'class': 'input-field col s6' }], row1);
    let input1 = m_input([{ 'class': 'validate', 'type': 'text', 'id': 'label_nome' }], col1);
    let label1 = m_label([{ 'for': 'label_nome', 'title': 'Nome' }], col1);

    let col2 = m_div([{ 'class': 'input-field col s6' }], row1);
    let input2 = m_input([{ 'class': 'validate', 'type': 'email', 'id': 'label_email' }], col2);
    let label2 = m_label([{ 'for': 'label_email', 'title': 'Email' }], col2);

    let col3 = m_div([{ 'class': 'input-field col s6' }], row1);
    let input3 = m_input([{ 'class': 'validate', 'type': 'text', 'id': 'label_endereco' }], col3);
    let label3 = m_label([{ 'for': 'label_endereco', 'title': 'Endereço' }], col3);

    let col4 = m_div([{ 'class': 'input-field col s6' }], row1);
    let input4 = m_input([{ 'class': 'validate', 'type': 'text', 'id': 'label_telefone' }], col4);
    let label4 = m_label([{ 'for': 'label_telefone', 'title': 'Telefone' }], col4);

    let col5 = m_div([{ 'class': 'input-field col s6' }], row1);
    let input5 = m_input([{ 'class': 'validate', 'type': 'text', 'id': 'label_instagram' }], col5);
    let label5 = m_label([{ 'for': 'label_instagram', 'title': 'Instagram' }], col5);

    let col14 = m_div([{ 'class': 'input-field col s6' }], row1);
    let input14 = m_input([{ 'class': 'validate', 'type': 'date', 'id': 'label_data_nascimento' }], col14);
    let label14 = m_label([{ 'for': 'label_data_nascimento', 'title': 'Data de nascimento' }], col14);

    let col15 = m_div([{ 'class': 'input-field col s12' }], row1);
    let input15 = m_textarea([{ 'class': 'materialize-textarea', 'type': 'text', 'id': 'label_obs' }], col15);
    let label15 = m_label([{ 'for': 'label_obs', 'title': 'Informações Adicionais' }], col15);

    let col6 = m_div([{ 'class': 'switch col s6' }], row1);
    let label6a = m_label([{ 'title': 'É um fornecedor?' }], col6);
    m_newLine(col6);
    let label6b = m_label([{ 'html': 'Não<input type="checkbox"><span class="lever yellow"></span>Sim', 'id': 'label_fornecedor' }], col6);

    let col12 = m_div([{ 'class': 'input-field col s6' }], row1);
    let col13 = m_div([{ 'class': 'input-field col s6' }], row1);

    let col16 = m_div([{ 'class': 'input-field col s6 fornecedor_hs' }], row1);
    let input16 = m_input([{ 'class': 'validate', 'type': 'text', 'id': 'label_fornecedor_cod' }], col16);
    let label16 = m_label([{ 'for': 'label_fornecedor_cod', 'title': 'Código do Fornecedor' }], col16);

    let col17 = m_div([{ 'class': 'input-field col s6 fornecedor_hs' }], row1);
    let input17 = m_input([{ 'class': 'validate', 'type': 'text', 'id': 'label_documento', 'max': '14' }], col17);
    let label17 = m_label([{ 'for': 'label_documento', 'title': 'CPF' }], col17);

    let col7 = m_div([{ 'class': 'input-field col s6 fornecedor_hs' }], row1);
    let input7 = m_input([{ 'class': 'validate', 'type': 'number', 'id': 'label_recurso', 'step': '0.01' }], col7);
    let label7 = m_label([{ 'for': 'label_recurso', 'title': 'Recurso' }], col7);

    let col8 = m_div([{ 'class': 'input-field col s6 fornecedor_hs' }], row1);
    let input8 = m_input([{ 'class': 'validate', 'type': 'text', 'id': 'label_pix' }], col8);
    let label8 = m_label([{ 'for': 'label_pix', 'title': 'PIX' }], col8);

    let formData = new FormData();
    let request = new XMLHttpRequest();

    request.open("POST", "model/response/cliente.php?op=list&class=Misc");

    request.onreadystatechange = function () {//Call a function when the state changes.
        if (request.readyState == 4 && request.status == 200) {
            let response = JSON.parse(this.responseText);
            if (response.object != null && response.row > 0) {

                let col9 = m_div([{ 'class': 'input-field col s6 fornecedor_hs' }], row1);
                let input9 = m_select([{ 'options': response.object.map(x => ({ 'value': x.id, 'label': x.nome })), 'id': 'label_banco' }], col9);
                let label9 = m_label([{ 'for': 'label_banco', 'title': 'Banco' }], col9);

                let col10 = m_div([{ 'class': 'input-field col s6 fornecedor_hs' }], row1);
                let input10 = m_input([{ 'class': 'validate', 'type': 'text', 'id': 'label_agencia' }], col10);
                let label10 = m_label([{ 'for': 'label_agencia', 'title': 'Agência' }], col10);

                let col11 = m_div([{ 'class': 'input-field col s6 fornecedor_hs' }], row1);
                let input11 = m_input([{ 'class': 'validate', 'type': 'text', 'id': 'label_conta' }], col11);
                let label11 = m_label([{ 'for': 'label_conta', 'title': 'Conta Corrente' }], col11);

                var elems = document.querySelectorAll('select');
                var instances = M.FormSelect.init(elems);

                col7.style.display = 'none';
                col8.style.display = 'none';
                col9.style.display = 'none';
                col10.style.display = 'none';
                col11.style.display = 'none';
                col16.style.display = 'none';
                col17.style.display = 'none';

                if (edit == 1) {

                    let formData2 = new FormData();
                    let request2 = new XMLHttpRequest();

                    formData2.append('id', id);

                    request2.open("POST", "model/response/cliente.php?op=view&class=Cliente");

                    request2.onreadystatechange = function () {//Call a function when the state changes.
                        if (request2.readyState == 4 && request2.status == 200) {
                            let response2 = JSON.parse(this.responseText);
                            if (response2.object != null && response2.row > 0) {
                                label1.classList.add('active');
                                input1.value = response2.object.nome;

                                label2.classList.add('active');
                                input2.value = response2.object.email;

                                label3.classList.add('active');
                                input3.value = response2.object.endereco;

                                label4.classList.add('active');
                                input4.value = foneFill(response2.object.telefone);

                                label5.classList.add('active');
                                input5.value = response2.object.instagram;

                                label15.classList.add('active');
                                input15.value = response2.object.obs;

                                label18.classList.add('active');
                                input18.value = response2.object.codigo;

                                let data = new Date(response2.object.data_nascimento);
                                input14.value = formatDate(data);

                                if (response2.object.fornecedor == 1) {

                                    label6b.querySelectorAll('input')[0].checked = true;
                                    verifyFornecedor(label6b.querySelectorAll('input')[0]);

                                    label7.classList.add('active');
                                    input7.value = response2.object.recurso;

                                    label8.classList.add('active');
                                    input8.value = response2.object.pix;

                                    input9.value = response2.object.banco_id;
                                    M.FormSelect.init(elems);

                                    label10.classList.add('active');
                                    input10.value = response2.object.ag;

                                    label11.classList.add('active');
                                    input11.value = response2.object.cc;

                                    label16.classList.add('active');
                                    input16.value = response2.object.fornecedor_cod;

                                    label17.classList.add('active');
                                    input17.value = response2.object.documento;

                                }
                            }
                        }
                    }

                    request2.send(formData2);
                }

                label16.classList.add('active');
                input16.value = response.sujestao_codigo_fornecedor;

                label18.classList.add('active');
                input18.value = response.sujestao_codigo_cliente;
                
                adicionarCliente(select);

            }
        }
    };

    request.send();

    label6b.querySelectorAll('input')[0].addEventListener('change', (x) => {

        verifyFornecedor(x.target);

    });

    foneMask(input4);
    cpfMask(input17);

};

verifyFornecedor = (x) => {
    let fornecedor_hs = document.getElementsByClassName('fornecedor_hs');

    var arr = Array.prototype.slice.call(fornecedor_hs);

    if (x.checked == true) {

        arr.map(x => (x.style.display = 'block'));

    } else {

        arr.map(x => (x.style.display = 'none'));

    }
};

validaCliente = (select) => {

    let nome = select.querySelectorAll('#label_nome')[0];
    let codigo = select.querySelectorAll('#label_codigo')[0];
    let fornecedor = select.querySelectorAll('#label_fornecedor')[0].querySelectorAll('input')[0];
    let fornecedor_cod = select.querySelectorAll('#label_fornecedor_cod')[0];
    // let email = select.querySelectorAll('#label_email')[0];
    // let endereco = select.querySelectorAll('#label_endereco')[0];
    // let telefone = select.querySelectorAll('#label_telefone')[0];
    // let instagram = select.querySelectorAll('#label_instagram')[0];
    let validado = true;
    let msg = '';

    //const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (nome.value == '') {

        validado = false;
        msg = 'nome';
    } else if (codigo.value == '') {
        validado = false;
        msg = 'codigo';
    }

    if (fornecedor.checked == true) {
        if (fornecedor_cod.value == '') {
            validado = false;
            msg = 'codigo do fornecedor';
        }
    }
    // } else if (email.value == '' || !re.test(String(email.value))) {

    //     validado = false;
    //     msg = 'email';

    // } else if (endereco.value == '') {

    //     validado = false;
    //     msg = 'endereço';

    // } else if (telefone.value == '') {

    //     validado = false;
    //     msg = 'telefone';

    // } else if (instagram.value == '') {

    //     validado = false;
    //     msg = 'instagram';

    // }

    if (!validado) {

        alert('Por favor preencha corretamente o campo ' + msg);

    }

    return validado;

}

adicionarCliente = (select) => {

    let btn_add_edit = select.querySelectorAll('#add_edit_cliente')[0];
    let modal_content = select.querySelectorAll('.modal-content')[0];

    let nome = modal_content.querySelectorAll('#label_nome')[0];
    let email = modal_content.querySelectorAll('#label_email')[0];
    let endereco = modal_content.querySelectorAll('#label_endereco')[0];
    let telefone = modal_content.querySelectorAll('#label_telefone')[0];
    let instagram = modal_content.querySelectorAll('#label_instagram')[0];
    let obs = modal_content.querySelectorAll('#label_obs')[0];
    let fornecedor = modal_content.querySelectorAll('#label_fornecedor')[0].querySelectorAll('input')[0];
    let recurso = modal_content.querySelectorAll('#label_recurso')[0];
    let pix = modal_content.querySelectorAll('#label_pix')[0];
    let banco = modal_content.querySelectorAll('#label_banco')[0];
    let agencia = modal_content.querySelectorAll('#label_agencia')[0];
    let cc = modal_content.querySelectorAll('#label_conta')[0];
    let data_nascimento = modal_content.querySelectorAll('#label_data_nascimento')[0];
    let documento = modal_content.querySelectorAll('#label_documento')[0];
    let fornecedor_cod = modal_content.querySelectorAll('#label_fornecedor_cod')[0];
    let codigo = modal_content.querySelectorAll('#label_codigo')[0];

    if (typeof (btn_add_edit) != 'undefined') {

        btn_add_edit.addEventListener('click', x => {

            let formData = new FormData();
            let request = new XMLHttpRequest();

            let validado = validaCliente(modal_content);

            let edit = x.target.dataset.edit;

            if (validado) {

                let r = confirm("Deseja cadastrar essas informações?");

                if (r === true) {

                    formData.append('nome', nome.value);
                    formData.append('email', email.value);
                    formData.append('endereco', endereco.value);
                    formData.append('telefone', telefone.value);
                    formData.append('instagram', instagram.value);
                    formData.append('data_nascimento', data_nascimento.value);
                    formData.append('obs', obs.value);
                    formData.append('fornecedor', fornecedor.checked);
                    formData.append('codigo', codigo.value);

                    if (fornecedor.checked == true) {

                        formData.append('documento', documento.value);
                        formData.append('fornecedor_cod', fornecedor_cod.value);
                        formData.append('recurso', recurso.value);
                        formData.append('pix', pix.value);
                        formData.append('banco', banco.value);
                        formData.append('ag', agencia.value);
                        formData.append('cc', cc.value);

                    }

                    if (edit == 1) {
                        let id = x.target.dataset.id;
                        formData.append('id', id);
                        request.open("POST", "model/response/cliente.php?op=edit&class=Cliente");
                    } else {
                        request.open("POST", "model/response/cliente.php?op=add&class=Cliente");
                    }

                    request.onreadystatechange = function () {//Call a function when the state changes.
                        if (request.readyState == 4 && request.status == 200) {
                            let response = JSON.parse(this.responseText);
                            if (response.object != null && response.row > 0) {

                                if (response.object == 1) {

                                    if (edit == 1) {
                                        alert('Atualização realizada com sucesso! :)');
                                    } else {
                                        alert('Cadastro realizado com sucesso! :)');
                                    }

                                    location.reload();


                                } else if (response.object == 2) {

                                    if (edit == 1) {
                                        alert('Não foi possível atualizar, código de cliente/fornecedor existente :(');
                                    } else {
                                        alert('Não foi possível cadastrar, código de cliente/fornecedor existente :(');
                                    }

                                }

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

clientTable = (select) => {

    let formData = new FormData();
    let request = new XMLHttpRequest();

    //formData.append("id_protocolo", id_protocolo);

    request.open("POST", "model/response/cliente.php?op=list&class=Cliente");

    request.onloadstart = function () {
        preLoader(select);
    };

    request.onreadystatechange = function () {//Call a function when the state changes.
        if (request.readyState == 4 && request.status == 200) {
            let response = JSON.parse(this.responseText);

            select.innerHTML = "";



            let title_cliente = m_big_title_h4([{ 'title': 'Cliente' }], select);
            let btn_add = m_anchor([{ 'title': 'Adicionar ', 'class': 'waves-effect waves-light btn-large', 'id': 'modal_add_cliente' }], select);
            let btn_add_icon = m_icon([{ 'class': 'fas fa-plus' }], btn_add);
            m_newLine(select);
            m_newLine(select);


            if (response.object != null && response.row > 0) {

                let table = m_table([{}], select);
                let thead = m_thead([{}], table);
                let tbody = m_tbody([{}], table);
                let tr1 = m_tr([{}], thead);
                let th1 = m_th([{ 'title': 'Nome' }], tr1);
                let th2 = m_th([{ 'title': 'Instagram' }], tr1);
                let th3 = m_th([{ 'title': 'Data de Aniversário' }], tr1);
                let th4 = m_th([{ 'title': 'Ações' }], tr1);

                response.object.map(x => {

                    let tr2 = m_tr([{}], tbody);
                    let td1 = m_td([{ 'title': x.nome }], tr2);
                    let td2 = m_td([{ 'title': x.instagram }], tr2);
                    let data = new Date(x.data_nascimento);
                    let td3 = m_td([{ 'title': viewDate(data) }], tr2);
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

                        let modal_view_cliente = document.getElementById('modal_view_cliente');
                        modalViewCliente(modal_view_cliente, element_id);
                        var instance = M.Modal.getInstance(modal_view_cliente);
                        instance.open();

                    });

                });

                arr2.map(x => {

                    x.addEventListener('click', (y) => {

                        let element_id = y.target.id;

                        if (y.target.nodeName == 'I') {
                            element_id = y.target.parentNode.id;
                        }

                        let modal_addedit_cliente = document.getElementById('modal_addedit_cliente');
                        modalAddEditCliente(modal_addedit_cliente, element_id, 1);
                        var instance = M.Modal.getInstance(modal_addedit_cliente);
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
                            delCliente(element_id);
                        }

                    });

                });

            } else {
                let divisor = m_div([{ 'class': 'divider' }], select);
                let panel = m_div([{ 'class': 'card-panel yellow lighten-2', 'title': 'Nenhum cliente cadastrado :(' }], select);
            }

            btn_add.addEventListener('click', x => {

                let modal_addedit_cliente = document.getElementById('modal_addedit_cliente');
                modalAddEditCliente(modal_addedit_cliente, null, 0);
                var instance = M.Modal.getInstance(modal_addedit_cliente);
                instance.open();

            });
        }
    };

    request.send();

};

delCliente = (id) => {
    let formData = new FormData();
    let request = new XMLHttpRequest();

    formData.append('id', id);

    request.open("POST", "model/response/cliente.php?op=delete&class=Cliente");

    request.onreadystatechange = function () {//Call a function when the state changes.
        if (request.readyState == 4 && request.status == 200) {
            let response = JSON.parse(this.responseText);
            if (response.object != null && response.row > 0) {
                alert('Cliente excluído com sucesso! :)');
                location.reload();
            }
        }
    }

    request.send(formData);

};
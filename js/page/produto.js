document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    let produto = document.getElementById('produto');
    productTable(produto);
});

delProduto = (id) => {
    let formData = new FormData();
    let request = new XMLHttpRequest();

    formData.append('id', id);

    request.open("POST", "model/response/produto.php?op=delete&class=Produto");

    request.onreadystatechange = function () {//Call a function when the state changes.
        if (request.readyState == 4 && request.status == 200) {
            let response = JSON.parse(this.responseText);
            if (response.object != null && response.row > 0) {
                alert('Produto excluído com sucesso! :)');
                location.reload();
            }
        }
    }

    request.send(formData);

};

modalViewProduto = (select, id) => {

    select.innerHTML = "";

    let modal_content = m_div([{ 'class': 'modal-content' }], select);
    let modal_footer = m_div([{ 'class': 'modal-footer' }], select);
    let title_h4 = m_big_title_h4([{ 'title': 'Produto' }], modal_content);
    let p = m_p([{}], modal_content);
    let btn_close = m_anchor([{ 'class': 'modal-close waves-effect waves-grey btn-flat', 'href': '#', 'title': 'Fechar' }], modal_footer);
    let row1 = m_div([{ 'class': 'row' }], p);

    let formData = new FormData();
    let request = new XMLHttpRequest();

    formData.append('id', id);

    request.open("POST", "model/response/produto.php?op=view&class=Produto");

    request.onreadystatechange = function () {//Call a function when the state changes.
        if (request.readyState == 4 && request.status == 200) {
            let response = JSON.parse(this.responseText);
            if (response.object != null && response.row > 0) {

                let half = m_div([{ 'class': 'row' }], p);
                let half1 = m_div([{ 'class': 'col12 center' }], half);
                let half2 = m_div([{ 'class': 'col12' }], half);

                if (response.object.img != null) {
                    let img_src = 'img/upload/' + response.object.id + '/' + response.object.img;

                    let img = m_img([{ 'src': img_src, 'class': 'responsive-img' }], half1);
                }

                let table = m_table([{}], half2);
                let tbody = m_tbody([{}], table);

                let tr1 = m_tr([{}], tbody);
                let tr2 = m_tr([{}], tbody);
                let tr3 = m_tr([{}], tbody);
                let tr4 = m_tr([{}], tbody);
                let tr5 = m_tr([{}], tbody);
                let tr6 = m_tr([{}], tbody);
                let tr7 = m_tr([{}], tbody);
                let tr8 = m_tr([{}], tbody);
                let tr9 = m_tr([{}], tbody);
                let tr10 = m_tr([{}], tbody);
                let tr12 = m_tr([{}], tbody);
                let tr13 = m_tr([{}], tbody);

                let td1 = m_td([{ 'title': 'Código' }], tr1);
                let td2 = m_td([{ 'title': response.object.codigo }], tr1);

                let td3 = m_td([{ 'title': 'Descrição' }], tr2);
                let td4 = m_td([{ 'title': response.object.descricao }], tr2);

                let td5 = m_td([{ 'title': 'Marca' }], tr3);
                let td6 = m_td([{ 'title': response.object.marca }], tr3);

                let td7 = m_td([{ 'title': 'Tamanho' }], tr4);
                let td8 = m_td([{ 'title': response.object.tamanho }], tr4);

                let td9 = m_td([{ 'title': 'Cor' }], tr5);
                let td10 = m_td([{ 'title': response.object.cor }], tr5);

                let td25 = m_td([{ 'title': 'Preço' }], tr6);
                let td26 = m_td([{ 'title': response.object.preco }], tr6);

                let td13 = m_td([{ 'title': 'Fornecedor' }], tr8);
                let td14 = m_td([{ 'title': response.object.fornecedor }], tr8);

            }
        }
    }

    request.send(formData);

};

productTable = (select) => {

    let formData = new FormData();
    let request = new XMLHttpRequest();

    //formData.append("id_protocolo", id_protocolo);

    request.open("POST", "model/response/produto.php?op=list&class=ProdutoByFornecedor");

    request.onloadstart = function () {
        preLoader(select);
    };

    request.onreadystatechange = function () {//Call a function when the state changes.
        if (request.readyState == 4 && request.status == 200) {
            let response = JSON.parse(this.responseText);

            select.innerHTML = "";

            let title_cliente = m_big_title_h4([{ 'title': 'Produto' }], select);
            let btn_add = m_anchor([{ 'title': 'Adicionar ', 'class': 'waves-effect waves-light btn-large', 'id': 'modal_add_produto' }], select);
            let btn_add_icon = m_icon([{ 'class': 'fas fa-plus' }], btn_add);
            m_newLine(select);
            m_newLine(select);
            let divisor = m_div([{ 'class': 'divider' }], select);

            if (response.object != null && response.row > 0) {

                response.object.fornecedores.map(x => {

                    let fornecedor_nome = m_big_title_h5([{ 'title': x.nome }], select);
                    let divisor = m_div([{ 'class': 'divider' }], select);

                    let table = m_table([{}], select);
                    let thead = m_thead([{}], table);
                    let tbody = m_tbody([{}], table);
                    let tr1 = m_tr([{}], thead);
                    let th1 = m_th([{ 'title': 'Código' }], tr1);
                    let th2 = m_th([{ 'title': 'Descrição' }], tr1);
                    let th3 = m_th([{ 'title': 'Valor' }], tr1);
                    let th4 = m_th([{ 'title': 'Ações' }], tr1);

                    let cor = 'blue-grey';
                    let texto = 'white-text';

                    if (response.object.produtos[x.id].length > 0) {

                        response.object.produtos[x.id].map(y => {

                            if (y.situacao == 1) {
    
                                cor = 'red';
    
                            } else if (y.situacao == 2) {
    
                                cor = 'blue';
    
                            }
    
                            console.log(response.object.produtos[x.id]);
    
                            let tr2 = m_tr([{ 'class': `${cor} lighten-1 ${texto}` }], tbody);
                            let td1 = m_td([{ 'title': y.codigo }], tr2);
                            let td2 = m_td([{ 'title': y.descricao }], tr2);
                            let td3 = m_td([{ 'title': 'R$ ' + y.preco }], tr2);
                            let td4 = m_td([{}], tr2);
                            let btn_view = m_anchor([{ 'title': 'Ver ', 'class': 'waves-effect waves-light btn-small btn_view', 'id': y.id }], td4);
                            let btn_view_icon = m_icon([{ 'class': 'fas fa-folder' }], btn_view);
                            if (y.situacao != 2) {
                                m_space(td4);
                                let btn_edit = m_anchor([{ 'title': 'Editar ', 'class': 'waves-effect waves-light btn-small btn_edit', 'id': y.id }], td4);
                                let btn_edit_icon = m_icon([{ 'class': 'fas fa-edit' }], btn_edit);
                                m_space(td4);
                                let btn_del = m_anchor([{ 'title': 'Apagar ', 'class': 'red waves-effect waves-light btn-small btn_del', 'id': y.id }], td4);
                                let btn_del_icon = m_icon([{ 'class': 'fas fa-trash-alt' }], btn_del);
                            }
    
                            btn_view = document.querySelectorAll('.btn_view');
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
    
                                    let modal_view_produto = document.getElementById('modal_view_produto');
                                    modalViewProduto(modal_view_produto, element_id);
                                    var instance = M.Modal.getInstance(modal_view_produto);
                                    instance.open();
    
                                });
    
                            });
    
                            arr2.map(x => {
    
                                x.addEventListener('click', (y) => {
    
                                    let element_id = y.target.id;
    
                                    if (y.target.nodeName == 'I') {
                                        element_id = y.target.parentNode.id;
                                    }
    
                                    let modal_addedit_produto = document.getElementById('modal_addedit_produto');
                                    modalAddEditProduto(modal_addedit_produto, element_id, 1);
                                    var instance = M.Modal.getInstance(modal_addedit_produto);
                                    instance.open();
    
                                });
    
                            });
    
                            arr3.map(x => {
    
                                x.addEventListener('click', (y) => {
    
                                    let element_id = y.target.id;
    
                                    if (y.target.nodeName == 'I') {
                                        element_id = y.target.parentNode.id;
                                    }
    
                                    let r = confirm("Deseja excluir esse produto?");
    
                                    if (r === true) {
                                        delProduto(element_id);
                                    }
    
                                });
    
                            });
    
                        });

                        
                    }

                });

            } else {
                let panel = m_div([{ 'class': 'card-panel yellow lighten-2', 'title': 'Nenhum produto cadastrado :(' }], select);
            }

            btn_add.addEventListener('click', x => {
                let modal_addedit_produto = document.getElementById('modal_addedit_produto');
                modalAddEditProduto(modal_addedit_produto, null, 0);
                var instance = M.Modal.getInstance(modal_addedit_produto);
                instance.open();

            });

            var query = window.location.search.substring(1);
            var qs = parse_query_string(query);

            if (typeof (qs.add) !== 'undefined') {
                if (qs.add == 'true') {
                    btn_add.click();
                }

            }
        }
    };

    request.send();

};

modalAddEditProduto = (select, id = null, edit = 0) => {

    select.innerHTML = "";

    let modal_content = m_div([{ 'class': 'modal-content' }], select);
    let modal_footer = m_div([{ 'class': 'modal-footer' }], select);
    let title_h4 = m_big_title_h4([{ 'title': 'Produto' }], modal_content);
    let p = m_p([{}], modal_content);
    let btn_close = m_anchor([{ 'class': 'modal-close waves-effect waves-grey btn-flat', 'href': '#', 'title': 'Cancelar' }], modal_footer);
    let btn_add_edit = m_anchor([{ 'class': 'waves-effect waves-green green btn-flat', 'href': '#', 'title': edit == 0 ? 'Adicionar' : 'Atualizar', 'id': 'add_edit_produto', 'data': `id=${id};edit=${edit}` }], modal_footer);
    let row1 = m_div([{ 'class': 'row' }], p);

    let col1 = m_div([{ 'class': 'input-field col s12' }], row1);
    let input1 = m_input([{ 'class': 'validate', 'type': 'text', 'id': 'label_codigo' }], col1);
    let label1 = m_label([{ 'for': 'label_codigo', 'title': 'Código' }], col1);

    let col2 = m_div([{ 'class': 'input-field col s12' }], row1);
    let input2 = m_textarea([{ 'class': 'materialize-textarea', 'type': 'text', 'id': 'label_descricao' }], col2);
    let label2 = m_label([{ 'for': 'label_descricao', 'title': 'Descrição' }], col2);

    let col3 = m_div([{ 'class': 'input-field col s6' }], row1);
    let input3 = m_input([{ 'class': 'validate', 'type': 'text', 'id': 'label_marca' }], col3);
    let label3 = m_label([{ 'for': 'label_marca', 'title': 'Marca' }], col3);

    let request = new XMLHttpRequest();

    request.open("POST", "model/response/produto.php?op=list&class=Misc");

    request.onreadystatechange = function () {//Call a function when the state changes.
        if (request.readyState == 4 && request.status == 200) {
            let response = JSON.parse(this.responseText);
            if (response.object != null && response.row > 0) {

                let col4 = m_div([{ 'class': 'input-field col s6' }], row1);
                let input4 = m_input([{ 'class': 'validate', 'type': 'text', 'id': 'label_tamanho' }], col4);
                let label4 = m_label([{ 'for': 'label_tamanho', 'title': 'Tamanho' }], col4);

                let col5 = m_div([{ 'class': 'input-field col s6' }], row1);
                let input5 = m_input([{ 'class': 'validate', 'type': 'text', 'id': 'label_cor' }], col5);
                let label5 = m_label([{ 'for': 'label_cor', 'title': 'Cor' }], col5);

                let col6 = m_div([{ 'class': 'input-field col s6' }], row1);
                let input6 = m_input([{ 'class': 'validate', 'type': 'number', 'id': 'label_preco', 'step': '0.01' }], col6);
                let label6 = m_label([{ 'for': 'label_preco', 'title': 'Preço' }], col6);

                let col11 = m_div([{ 'class': 'input-field col s6' }], row1);
                let input11 = m_select([{ 'options': [{ 'value': '0', 'label': 'Deu Entrada' }, { 'value': '1', 'label': 'Precificada e não Vendida' }, { 'value': '2', 'label': 'Vendida' }], 'id': 'label_situacao' }], col11);
                let label11 = m_label([{ 'for': 'label_situacao', 'title': 'Situação' }], col11);

                let col7 = m_div([{ 'class': 'input-field col s6' }], row1);
                let input7 = m_select([{ 'options': response.object.fornecedor != null ? response.object.fornecedor.map(x => ({ 'value': x.id, 'label': x.nome })) : [], 'id': 'label_fornecedor' }], col7);
                let label7 = m_label([{ 'for': 'label_fornecedor', 'title': 'Fornecedor' }], col7);

                label1.classList.add('active');
                input1.value = response.object.codigo;

                if (edit == 0) {

                    let col8 = m_div([{ 'class': 'input-field col s12' }], row1);
                    let file_field = m_div([{ 'class': 'file-field input-field' }], col8);
                    let btn_file = m_div([{ 'class': 'btn' }], file_field);
                    let file_path = m_div([{ 'class': 'file-path-wrapper' }], file_field);
                    let file_span = m_span([{ 'title': 'Imagem' }], btn_file);
                    let input8 = m_input([{ 'type': 'file', 'id': 'img' }], btn_file);
                    let input_file = m_input([{ 'type': 'text', 'class': 'file-path validate' }], file_path);

                }

                var elems = document.querySelectorAll('select');
                var instances = M.FormSelect.init(elems);

                if (edit == 1) {

                    let formData2 = new FormData();
                    let request2 = new XMLHttpRequest();

                    formData2.append('id', id);

                    request2.open("POST", "model/response/produto.php?op=view&class=Produto");

                    request2.onreadystatechange = function () {//Call a function when the state changes.
                        if (request2.readyState == 4 && request2.status == 200) {
                            let response2 = JSON.parse(this.responseText);
                            if (response2.object != null && response2.row > 0) {

                                label1.classList.add('active');
                                input1.value = response2.object.codigo;

                                label2.classList.add('active');
                                input2.value = response2.object.descricao;

                                label3.classList.add('active');
                                input3.value = response2.object.marca;

                                label4.classList.add('active');
                                input4.value = response2.object.tamanho;

                                label5.classList.add('active');
                                input5.value = response2.object.cor;

                                input11.value = response2.object.situacao;

                                label6.classList.add('active');
                                input6.value = response2.object.preco;

                                input7.value = response2.object.fornecedor_id;

                                //input8.value = response2.object.marca;

                                let input9 = m_div([{ 'class': 'col s3' }], row1);
                                let input10 = m_div([{ 'class': 'col s9' }], row1);

                                let col8 = m_div([{ 'class': 'input-field col s12' }], row1);
                                let file_field = m_div([{ 'class': 'file-field input-field' }], col8);
                                let btn_file = m_div([{ 'class': 'btn' }], file_field);
                                let file_path = m_div([{ 'class': 'file-path-wrapper' }], file_field);
                                let file_span = m_span([{ 'title': 'Imagem' }], btn_file);
                                let input8 = m_input([{ 'type': 'file', 'id': 'img' }], btn_file);
                                let input_file = m_input([{ 'type': 'text', 'class': 'file-path validate' }], file_path);

                                if (response2.object.img != null) {
                                    let img_src = 'img/upload/' + response2.object.id + '/' + response2.object.img;

                                    let img = m_img([{ 'src': img_src }], input9);

                                    img.width = 90;

                                    let btn_change_img = m_anchor([{ 'class': 'waves-effect waves-grey green btn-flat', 'id': 'trocar_foto', 'title': 'Trocar Foto' }], input10);

                                    col8.style.display = 'none';

                                    btn_change_img.addEventListener('click', x => {
                                        input8.click();

                                    });
                                }

                                M.FormSelect.init(elems);

                                adicionarProduto(select);

                            }
                        }
                    }

                    request2.send(formData2);

                } else {
                    adicionarProduto(select);

                    input6.addEventListener('blur', x => {
                        if (input6.value > 0) {
                            input11.value = 1;
                            M.FormSelect.init(elems);
                        }
                    });
                }
            }

        }
    };

    request.send();
};

validaProduto = (select) => {

    let codigo = select.querySelectorAll('#label_codigo')[0];
    let descricao = select.querySelectorAll('#label_descricao')[0];
    let validado = true;
    let msg = '';

    if (codigo.value == '') {

        validado = false;
        msg = 'codigo';

    } else if (descricao.value == '') {

        validado = false;
        msg = 'descricao';

    }

    if (!validado) {

        alert('Por favor preencha corretamente o campo ' + msg);

    }

    return validado;

}

adicionarProduto = (select) => {

    let btn_add_edit = select.querySelectorAll('#add_edit_produto')[0];
    let modal_content = select.querySelectorAll('.modal-content')[0];

    let codigo = modal_content.querySelectorAll('#label_codigo')[0];
    let descricao = modal_content.querySelectorAll('#label_descricao')[0];
    let marca = modal_content.querySelectorAll('#label_marca')[0];
    let tamanho = modal_content.querySelectorAll('#label_tamanho')[0];
    let cor = modal_content.querySelectorAll('#label_cor')[0];
    let preco = modal_content.querySelectorAll('#label_preco')[0];
    let fornecedor = modal_content.querySelectorAll('#label_fornecedor')[0];
    let situacao = modal_content.querySelectorAll('#label_situacao')[0];
    let img = modal_content.querySelectorAll('#img')[0];

    if (typeof (btn_add_edit) != 'undefined') {

        btn_add_edit.addEventListener('click', x => {

            let formData = new FormData();
            let request = new XMLHttpRequest();

            let validado = validaProduto(modal_content);

            let edit = x.target.dataset.edit;

            if (validado) {

                if (fornecedor.value == '') {

                    alert('Para começar a cadastrar os produtos primeiro cadastre um fornecedor');

                } else {

                    let r = confirm("Deseja cadastrar essas informações?");

                    if (r === true) {

                        formData.append('codigo', codigo.value);
                        formData.append('descricao', descricao.value);
                        formData.append('marca', marca.value);
                        formData.append('tamanho', tamanho.value);
                        formData.append('cor', cor.value);
                        formData.append('preco', preco.value);
                        formData.append('fornecedor_id', fornecedor.value);
                        formData.append('img', img.files[0]);
                        formData.append('situacao', situacao.value);

                        if (edit == 1) {
                            let id = x.target.dataset.id;
                            formData.append('id', id);
                            request.open("POST", "model/response/produto.php?op=edit&class=Produto");
                        } else {
                            request.open("POST", "model/response/produto.php?op=add&class=Produto");
                        }

                        request.onreadystatechange = function () {//Call a function when the state changes.
                            if (request.readyState == 4 && request.status == 200) {
                                let response = JSON.parse(this.responseText);
                                if (response.object != null && response.row > 0) {
                                    if (response.object == 1) {
                                        if (edit == 1) {
                                            alert('Atualização realizada com sucesso! :)');
                                            window.location.href = '?page=produto&add=false';
                                        } else {
                                            alert('Cadastro realizado com sucesso! :)');
                                            window.location.href = '?page=produto&add=true';
                                        }
                                        //location.reload();

                                    } else if (response.object == 2) {
                                        if (edit == 1) {
                                            alert('Não foi possível atualizar, código de produto existente :(');
                                        } else {
                                            alert('Não foi possível adicionar, código de produto existente :(');
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

            }

        });

    }

}
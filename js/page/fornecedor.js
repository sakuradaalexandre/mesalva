document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    let fornecedor = document.getElementById('fornecedor');

    ownerTable(fornecedor);
});

validaValor = (valor, max) => {

    let ret = true;

    if (valor == '') {
        alert('insira um valor válido!');
        ret = false;
    } else if (parseFloat(valor) > parseFloat(max)) {
        alert('insira um valor menor ou igual ao valor da dívida!');
        ret = false;
    }

    return ret;

}


modalPay = (select, elemento) => {


    select.innerHTML = "";

    let modal_content = m_div([{ 'class': 'modal-content' }], select);
    let modal_footer = m_div([{ 'class': 'modal-footer' }], select);
    let title_h4 = m_big_title_h4([{ 'title': 'Abater Recurso' }], modal_content);
    let p = m_p([{}], modal_content);
    let btn_close = m_anchor([{ 'class': 'modal-close waves-effect waves-grey btn-flat', 'href': '#', 'title': 'Fechar' }], modal_footer);
    let btn_pay = m_anchor([{ 'class': 'waves-effect green lighten-1 waves-grey btn-flat', 'id': 'pagar_recurso', 'title': 'Pagar' }], modal_footer);
    let row1 = m_div([{ 'class': 'row' }], p);
    let col1 = m_div([{ 'class': 'input-field col s12' }], row1);

    let input1 = m_input([{ 'class': 'validate', 'type': 'number', 'id': 'label_recurso_pago', 'step': '0.01', 'maxVal': elemento.dataset.recurso }], col1);
    let label1 = m_label([{ 'for': 'label_recurso_pago', 'title': 'Pagar Recurso' }], col1);


    btn_pay.addEventListener('click', x => {

        let verify = validaValor(input1.value, elemento.dataset.recurso);

        if (verify == true) {

            let r = confirm("Deseja enviar essa informação?");

            if (r === true) {

                let formData = new FormData();
                let request = new XMLHttpRequest();

                formData.append('id', elemento.id);
                formData.append('recurso_pago', input1.value);

                request.open("POST", "model/response/fornecedor.php?op=edit&class=Cliente");

                request.onreadystatechange = function () {//Call a function when the state changes.
                    if (request.readyState == 4 && request.status == 200) {
                        let response = JSON.parse(this.responseText);
                        if (response.object != null && response.row > 0) {
                            alert('Valor atualizado com sucesso :)');
                            location.reload();
                        } else {
                            alert('Por algum motivo não foi possível realizar esta operação :(');
                        }
                    }
                }

                request.send(formData);

            }

        }

    });

};

modalViewForProd = (select, id) => {

    select.innerHTML = "";

    let modal_content = m_div([{ 'class': 'modal-content' }], select);
    let modal_footer = m_div([{ 'class': 'modal-footer' }], select);
    let title_h4 = m_big_title_h4([{ 'title': 'Produtos' }], modal_content);
    let p = m_p([{}], modal_content);
    let btn_close = m_anchor([{ 'class': 'modal-close waves-effect waves-grey btn-flat', 'href': '#', 'title': 'Fechar' }], modal_footer);
    let btn_prod_pdf = m_anchor([{ 'class': 'modal-close waves-effect waves-grey btn-flat blue lighten-1', 'href': 'view/fornecedor_produto.php?id=' + id, 'target': '_blank', 'title': 'Gerar PDF' }], modal_footer);
    let row1 = m_div([{ 'class': 'row' }], p);

    let formData = new FormData();
    let request = new XMLHttpRequest();

    formData.append('id', id);

    request.open("POST", "model/response/fornecedor.php?op=list&class=Produto");

    request.onreadystatechange = function () {//Call a function when the state changes.
        if (request.readyState == 4 && request.status == 200) {
            let response = JSON.parse(this.responseText);
            if (response.object != null && response.row > 0) {

                let table = m_table([{}], p);
                let thead = m_thead([{}], table);
                let tbody = m_tbody([{}], table);
                let tr_th = m_tr([{}], thead);
                let th1 = m_th([{ 'title': 'Código' }], tr_th);
                let th2 = m_th([{ 'title': 'Descrição' }], tr_th);
                let th3 = m_th([{ 'title': 'Preço' }], tr_th);

                response.object.map(x => {

                    let cor = 'blue-grey';
                    let texto = 'white-text';

                    if (x.situacao == 1) {

                        cor = 'red';

                    } else if (x.situacao == 2) {

                        cor = 'blue';

                    }

                    let tr1 = m_tr([{ 'class': `${cor} lighten-1 ${texto}` }], tbody);
                    let td1 = m_td([{ 'title': x.codigo }], tr1);
                    let td2 = m_td([{ 'title': x.descricao }], tr1);
                    let td3 = m_td([{ 'title': x.preco == null ? '' : 'R$ ' + x.preco }], tr1);

                });
            }
        }
    }

    request.send(formData);

};

ownerTable = (select) => {

    let formData = new FormData();
    let request = new XMLHttpRequest();

    //formData.append("id_protocolo", id_protocolo);

    request.open("POST", "model/response/fornecedor.php?op=list&class=Fornecedor");

    request.onloadstart = function () {
        preLoader(select);
    };

    request.onreadystatechange = function () {//Call a function when the state changes.
        if (request.readyState == 4 && request.status == 200) {
            let response = JSON.parse(this.responseText);

            select.innerHTML = "";

            let title_cliente = m_big_title_h4([{ 'title': 'Fornecedor' }], select);
            m_newLine(select);
            m_newLine(select);
            let divisor = m_div([{ 'class': 'divider' }], select);

            let total_recurso = m_big_title_h4([{}], null);
            total_recurso.innerHTML = '';

            if (response.object != null && response.row > 0) {
                let total = 0;

                let table = m_table([{}], select);
                let thead = m_thead([{}], table);
                let tbody = m_tbody([{}], table);
                let tr1 = m_tr([{}], thead);
                let th1 = m_th([{ 'title': 'Nome' }], tr1);
                let th2 = m_th([{ 'title': 'Recurso Devedor' }], tr1);
                let th3 = m_th([{ 'title': 'Recurso Pago' }], tr1);
                let th4 = m_th([{ 'title': 'Ações' }], tr1);

                response.object.map(x => {

                    let tr2 = m_tr([{}], tbody);
                    let td1 = m_td([{ 'title': x.nome }], tr2);
                    let td2 = m_td([{ 'title': 'R$ ' + x.recurso }], tr2);
                    let td3 = m_td([{ 'title': 'R$ ' + (x.recurso_pago == null ? '0' : x.recurso_pago) }], tr2);
                    let td4 = m_td([{}], tr2);
                    let btn_pay = m_anchor([{ 'title': 'Pagar Recurso ', 'class': 'waves-effect waves-light btn-small btn_pay', 'id': x.id, 'data': 'recurso=' + (x.recurso == null ? 0 : x.recurso) }], td4);
                    let btn_pay_icon = m_icon([{ 'class': 'fas fa-money-bill-wave' }], btn_pay);
                    m_space(td4);
                    let btn_view = m_anchor([{ 'title': 'Produtos ', 'class': 'waves-effect waves-light btn-small btn_view', 'id': x.id }], td4);
                    let btn_view_icon = m_icon([{ 'class': 'fas fa-folder' }], btn_view);
                    m_space(td4);
                    let btn_view_contract = m_anchor([{ 'title': 'Contrato ', 'class': 'waves-effect waves-light btn-small', 'id': x.id, 'href': 'view/ver_contrato.php?id=' + x.id, 'target': '_blank' }], td4);
                    let btn_view_contract_icon = m_icon([{ 'class': 'fas fa-file-contract' }], btn_view_contract);

                    total += parseFloat(x.recurso);
                    total -= parseFloat(x.recurso_pago == null ? 0 : x.recurso_pago);

                });

                total_recurso.textContent = 'Total de Recurso Devedor R$ ' + total;

                select.appendChild(total_recurso);

                let btn_view2 = document.querySelectorAll('.btn_view');
                let btn_pay = document.querySelectorAll('.btn_pay');
                var arr = Array.prototype.slice.call(btn_view2);
                var arr2 = Array.prototype.slice.call(btn_pay);

                arr.map(x => {

                    x.addEventListener('click', y => {

                        let element_id = y.target.id;

                        if (y.target.nodeName == 'I') {
                            element_id = y.target.parentNode.id;
                        }

                        let modal_view_for_prod = document.getElementById('modal_view_for_prod');
                        modalViewForProd(modal_view_for_prod, element_id);
                        var instance = M.Modal.getInstance(modal_view_for_prod);
                        instance.open();

                    });

                });

                arr2.map(x => {

                    x.addEventListener('click', y => {

                        let element = y.target;

                        if (y.target.nodeName == 'I') {
                            element = y.target.parentNode;
                        }

                        let modal_pay = document.getElementById('modal_pay');
                        modalPay(modal_pay, element);
                        var instance = M.Modal.getInstance(modal_pay);
                        instance.open();

                    });

                });

            } else {
                let panel = m_div([{ 'class': 'card-panel yellow lighten-2', 'title': 'Nenhum fornecedor cadastrado :(' }], select);
            }
        }

        let panel2 = m_div([{ 'class': 'card-panel blue lighten-2', 'title': 'Para cadastrar um novo fornecedor utilize o cadastro de cliente' }], select);
    };

    request.send();

};
document.addEventListener('DOMContentLoaded', function () {
    let backup = document.getElementById('backup');
    backupData(backup);
});

backupData = (select) => {

    let formData = new FormData();
    let request = new XMLHttpRequest();

    request.open("POST", "model/response/backup.php?op=list&class=All");

    request.onreadystatechange = function () {//Call a function when the state changes.
        if (request.readyState == 4 && request.status == 200) {
            let response = JSON.parse(this.responseText);
            if (response.object != null && response.row > 0) {
                let banco_title = m_big_title_h4([{'title': 'Banco'}], select);
                m_div([{ 'class': 'divider' }], select);
                let banco_col = m_div([{ 'title': 'id, nome'}], select);
                m_div([{ 'class': 'divider' }], select);
                response.object.banco.map(x => {
                    let banco_col2 = m_div([{'title': x.id + ', ' + x.nome}], select);
                });

                let cliente_title = m_big_title_h4([{'title': 'Cliente'}], select);
                m_div([{ 'class': 'divider' }], select);
                let cliente_col = m_div([{ 'title': 'ag, banco_id, cc, codigo, data_de_modificacao, data_nascimento, documento, email, endereco, fornecedor, fornecedor_cod, id, instagram, nome, obs, pix, recurso, recurso_pago, telefone'}], select);
                m_div([{ 'class': 'divider' }], select);
                response.object.cliente.map(x => {
                    let cliente_col2 = m_div([{'title': x.ag + ', ' + x.banco_id + ', ' + x.cc + ', ' + x.codigo + ', ' + x.data_de_modificacao + ', ' + x.data_nascimento + ', ' + x.documento + ', ' + x.email + ', ' + x.endereco + ', ' + x.fornecedor + ', ' + x.fornecedor_cod + ', ' + x.id + ', ' + x.instagram + ', ' + x.nome + ', ' + x.obs + ', ' + x.pix + ', ' + x.recurso + ', ' + x.recurso_pago + ', ' + x.telefone}], select);
                });

                let fornecedor_produto_title = m_big_title_h4([{'title': 'Fornecedor Produto'}], select);
                m_div([{ 'class': 'divider' }], select);
                let fornecedor_produto_col = m_div([{ 'title': 'id, cliente_id, produto_id'}], select);
                m_div([{ 'class': 'divider' }], select);
                response.object.fornecedor_produto.map(x => {
                    let fornecedor_produto_col2 = m_div([{'title': x.id + ', ' + x.cliente_id + ', ' + x.produto_id}], select);
                });

                let pagamento_title = m_big_title_h4([{'title': 'Pagamento'}], select);
                m_div([{ 'class': 'divider' }], select);
                let pagamento_col = m_div([{ 'title': 'id, nome'}], select);
                m_div([{ 'class': 'divider' }], select);
                response.object.pagamento.map(x => {
                    let pagamento_col2 = m_div([{'title': x.id + ', ' + x.nome}], select);
                });

                let produto_title = m_big_title_h4([{'title': 'Produto'}], select);
                m_div([{ 'class': 'divider' }], select);
                let produto_col = m_div([{ 'title': 'codigo, cor, descricao, id, img, marca, preco, situacao, tamanho'}], select);
                m_div([{ 'class': 'divider' }], select);
                response.object.produto.map(x => {
                    let produto_col2 = m_div([{'title': x.codigo + ', ' + x.cor + ', ' + x.descricao + ', ' + x.id + ', ' + x.img + ', ' + x.marca + ', ' + x.preco + ', ' + x.situacao + ', ' + x.tamanho}], select);
                });

                let produto_venda_title = m_big_title_h4([{'title': 'Produto Venda'}], select);
                m_div([{ 'class': 'divider' }], select);
                let produto_venda_col = m_div([{ 'title': 'id, produto_id, venda_id'}], select);
                m_div([{ 'class': 'divider' }], select);
                response.object.produto_venda.map(x => {
                    let produto_venda_col2 = m_div([{'title': x.id + ', ' + x.produto_id + ', ' + x.venda_id}], select);
                });

                let venda_title = m_big_title_h4([{'title': 'Venda'}], select);
                m_div([{ 'class': 'divider' }], select);
                let venda_col = m_div([{ 'title': 'cliente_id, data, id, obs, pagamento_id, valor'}], select);
                m_div([{ 'class': 'divider' }], select);
                response.object.venda.map(x => {
                    let venda_col2 = m_div([{'title': x.cliente_id + ', ' + x.data + ', ' + x.id + ', ' + x.obs + ', ' + x.pagamento_id + ', ' + x.valor}], select);
                });

            }
        }
    }

    request.send();


};
<!DOCTYPE html>
<html>

<head>
  <!--Import Google Icon Font-->
  <link href="css/fontawesome-free-5.15.3-web/css/all.min.css" rel="stylesheet"> <!--load all styles -->
  <!--Import materialize.css-->
  <link type="text/css" rel="stylesheet" href="css/materialize.min.css" media="screen,projection" />
  <link type="text/css" rel="stylesheet" href="css/page/index.css" media="screen,projection" />
  <!--Let browser know website is optimized for mobile-->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body>

  <?php
    $page = !isset($_GET['page']) ? 'venda': $_GET['page'];
  ?>

  <nav>
    <div class="nav-wrapper purple">
      <div class="container">
        <ul id="nav-mobile" class="right hide-on-med-and-down">
        </ul>
      </div>
    </div>
  </nav>

  <ul id="slide-out" class="sidenav sidenav-fixed">
    <li>
      <div class="user-view">
        <div class="background">
          <img src="img/logo.png">
        </div>
        <br />
      </div>
    </li>
    
    <li class="<?php echo $page == 'cliente' ? 'active' : '' ?>"><a href="?page=cliente"><i class="fas fa-user"></i>Cliente</a></li>
    <li class="<?php echo $page == 'produto' ? 'active' : '' ?>"><a href="?page=produto"><i class="fas fa-archive"></i>Produto</a></li>
    <li class="<?php echo $page == 'fornecedor' ? 'active' : '' ?>"><a href="?page=fornecedor"><i class="fas fa-user-tie"></i>Fornecedor</a></li>
    <li class="<?php echo $page == 'venda' ? 'active' : ($page == 'add_edit_venda' ? 'active' : '') ?>"><a href="?page=venda"><i class="far fa-file-alt"></i>Venda</a></li>
    <li class="<?php echo $page == 'relatorio' ? 'active' : '' ?>"><a href="?page=relatorio"><i class="fas fa-chart-line"></i>Relatórios</a></li>
    <li class="<?php echo $page == 'info' ? 'active' : '' ?>"><a href="?page=info"><i class="fas fa-store-alt"></i>Informações da Empresa</a></li>
    <li class="<?php echo $page == 'backup' ? 'active' : '' ?>"><a href="?page=backup"><i class="fas fa-database"></i>Backup</a></li>
  </ul>

  <script type="text/javascript" src="js/jquery-3.6.0.min.js"></script>
  <script type="text/javascript" src="js/nodeBuilder.js"></script>
  <script type="text/javascript" src="js/preloader.js"></script>
  <script type="text/javascript" src="js/materialize.min.js"></script>
  <script type="text/javascript" src="js/page/sidenav.js"></script>

  <?php
  include_once 'controller/controller.php'
  ?>

</body>

</html>
class Configuracao {
  constructor() {
    this.base = "10_10";
    this.logo = "logo_sam_1";
    this.logo_pos = "bottom_left";
    this.text = "Sam meme generator";
    this.meme_quality = 100;
    this.logo_opacity = 100;
  }
  
  get_url() {
    return `https://sam-meme.herokuapp.com/api/v1/generator?base=${this.base}&logo=${this.logo}&logo_pos=${this.logo_pos}&text=${this.text}&meme_quality=${this.meme_quality}&logo_opacity=${this.logo_opacity}&debug=${Math.random()}`
  }

  get_download_url() {
    return `https://sam-meme.herokuapp.com/api/v1/generator/download?base=${this.base}&logo=${this.logo}&logo_pos=${this.logo_pos}&text=${this.text}&meme_quality=${this.meme_quality}&logo_opacity=${this.logo_opacity}`;
  }

}

const configuracao = new Configuracao()
let request;

function clear_menu_options() {
  $(".base").hide()
  $(".texto").hide()
  $(".selo").hide()
  $(".opcoes").hide()
  $(".menu_option").removeClass("selected")
}

function update_preview() {

  if (request){
    clearTimeout(request);
    delay=1000;
  }else{
    delay=0;
  }

  request = setTimeout(()=>{
    $("#meme_preview").attr("src", configuracao.get_url())
    $("#download").attr("href", configuracao.get_download_url())
  },delay);
}

$(document).ready(() => {
  update_preview()

  $(".menu_option").click(function() {
    let option = $(this).text()

    clear_menu_options()

    if (option == "Base") {
      $(".base").show()
    } else if (option == "Texto") {
      $(".texto").show()
    } else if (option == "Selo") {
      $(".selo").show()
    } else if (option == "Opções") {
      $(".opcoes").show()
    }

    $(this).addClass("selected")
  })

  $(".base_option").click(function() {
    configuracao.base = $(this).attr("rel")
    $(".base_option").removeClass("selected")
    $(this).addClass("selected")
    
    update_preview()
  })

  $("#save").click(() => {
    configuracao.text = $("#texto").val()

    update_preview()
  })

  $(".selo_img_option").click(function() {
    configuracao.logo = $(this).attr("rel")
    $(".selo_img_option").removeClass("selected")
    $(this).addClass("selected")

    update_preview()
  })

  $(".selo_pos_option").click(function() {
    configuracao.logo_pos = $(this).attr("rel")
    $(".selo_pos_option").removeClass("selected")
    $(this).addClass("selected")

    update_preview()
  })

  $(".salvar_opcao").click(() => {
    let opacidade = Number($("#opacidade").val())
    let qualidade = Number($("#qualidade").val())

    if (opacidade < 0 || opacidade > 100) {
      return alert("Opacidade inválida")
    }

    if (qualidade < 0 || qualidade > 100) {
      return alert("Qualidade inválida")
    }
    
    configuracao.logo_opacity = opacidade
    configuracao.meme_quality = qualidade

    update_preview()
  })
})

Vue.component('card-mikro', {
    data: function(){
      return {
        baget: "",
        status: true,
        color: "color: #374253",
        connecting: true
      }
    },
    props: ['mikro'],
    methods: {
      connect: function(){
        this.baget = ''
        this.status = ''
        this.color = 'color: #374253'
        this.connecting = true 

        fetch(document.location.origin+':3001/zonawifi/'+this.mikro.id+'/'+this.mikro.access+'/'+this.mikro.ip+"/"+this.mikro.port+"/status?token="+api_token)
        .then(response => response.json())
        .then(data => {
          console.log(data.status)
          switch (data.status){
            case 'Inactivo':
              this.status = "Inactivo: por favor reinicie su equipo para corregir este inconveninete"
              this.baget = "bg-warning"
            break
            case 'Activo':
              this.status = "Activo"
              this.baget = "bg-success"
            break
          }
          this.connecting = false
          this.color = "color: white"

        }, error => {
          
          console.log(error)

          this.status = "Error de Conexion"
          this.baget = "bg-danger"
          this.connecting = false
          this.color = "color: white"
          
        });

      },
      url_mikro: function(){
        return ("{{path_for('base')}}appzona/conectados?router="+this.mikro.id);
      }
    },
    created: function(){
      
      this.connect()
    },
    template: '<transition name="fade"><div class="col-sm-6 col-lg-3 my-3">\
                <div class="card pb-4 text-white " v-bind:class="baget">\
                  <div class="card-body pb-0 d-flex justify-content-between align-items-start">\
                    <div>\
                      <div class="fs-5 fw-semibold" v-bind:style="color">{{ '{{ mikro.descripcion }}' }}</div>\
                      <div>{{ mikro.ip }}</div>\
                    </div>\
                    <div class="dropdown">\
                      <button class="btn btn-transparent text-white p-0" type="button" data-coreui-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                        <svg class="icon">\
                          <use xlink:href="../assets/src/node_modules/@coreui/icons/sprites/free.svg#cil-options"></use>\
                        </svg>\
                      </button>\
                      <div class="dropdown-menu dropdown-menu-end"><a class="dropdown-item" v-bind:href="url_mikro()">Administrar</a><a class="dropdown-item" href="#" v-on:click.prevent="connect">Conectar</a><a class="dropdown-item text-danger" href="#">Eliminar</a></div>\
                    </div>\
                  </div>\
                  <div class="c-chart-wrapper mt-3 mx-3" style="height:70px;">\
                    {{ '{{status}}' }}\
                    <div class="d-flex align-items-center" v-if="connecting" style="color: #374253">\
                      <strong>Conectando...</strong>\
                      <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>\
                    </div>\
                  </div>\
                </div>\
              </div></transition>'
  })



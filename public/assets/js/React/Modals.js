class Modal extends React.Component{
    constructor(props){
        super(props);
        let fields = this.getFields(this.props.fields);
        this.state = {
                    fields,
                    loading: false
                };

        this.submit = this.submit.bind(this);
        this.changeState = this.changeState.bind(this);
    }

    componentDidUpdate(prevProps) {
        
        if (this.props.fields.id !== this.state.fields.id) {
            
            let fields = this.getFields(this.props.fields);
       
            this.setState({fields});
        }

    }

    getFields(fields){
        let buffer = {};

        for (const property in fields) {
                
            if(fields[property] == null | fields[property] == undefined){
                
                buffer[property] = " ";
            
            }else{
                buffer[property] = fields[property];
            }
        } 

        return buffer;
    }


    /*componentDidMount(){
        
        let fields = this.getFields(this.props.fields);
       
        this.setState({fields});
    }*/

    /*onChange2(event){

       let value = event.target.value;
       let name = event.target.name;
       let buffer = this.props.changeState("get");

       buffer.InputsData[name] = value;

       this.props.changeState("put", buffer);
    }*/

    changeState(action, state = {}){

        if(action == "get"){
            return this.state;
        }else if(action == "put"){
            this.setState(state);
        }else{
            return false;
        }
          
    }

    resetState(){
        this.setState({
                    fields: {
                        descripcion: "",
                        valor: "",
                        id_mes: "",
                        fecha: "" 
                    }
                });

    }
    
    submit(){
        this.setState({loading: true});
      
        let param = this.state.fields;

        let url = this.props.url.put;
        
        let data = new FormData();

        //este es temporal
        data.append("funcion", this.props.funcion);
        //******

        for (const property in param) {

            data.append("data["+property+"]", param[property]);

        } 

        fetch(url, {
            method: "POST",
            body: data
        })
        .then(res => res.json())
        .then(
            (result) => {
                validar(result);
            
                let fila = addRow(result, index_tb);
                
                fila[0][0] = '<input type="checkbox" name="check-all" onclick="this.checked = !this.checked" value="'+result[0].id+'">'
                

                table.row.add(fila[0]).draw().nodes().to$().addClass( 'id_'+result[0].id );

                new PNotify({
                        title: 'Registro Creado',
                        text: 'Los registros han sido creados correctamente',
                        type: 'success',
                        styling: 'bootstrap3'
                    });

                $(".bs-example-modal-cobrar").modal("hide");
                this.setState({loading: false});
                this.resetState();
              
            },
            (error) => {
                console.error("Error al obtener gasto"+error);
                this.setState({loading: false});
            }
        );
    }

    render(){

        return(
            <div className="modal fade bs-example-modal-cobrar" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                <div className="modal-content">

                <div className="modal-header">
                    <h4 className="modal-title" id="Modaltitle">{this.props.title}</h4>
                    <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="modal-body">
                    {this.props.BodyContent(this.changeState, this.state.fields)}
                </div>
                
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" disabled={this.state.loading} data-dismiss="modal">Cerrar</button>
                    <button type="button" className="btn btn-primary" disabled={this.state.loading} id="modal-btn-cobrar" onClick={this.submit}>{this.props.button1}</button>
                </div>
                

                </div>
                </div>
            </div>
        );
    }
}
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import vis from 'vis';

export default class Network extends Component {
    constructor(props) {
        super(props);
        this.nn = new vis.DataSet()
        this.ee = new vis.DataSet()
        this.net = 0       
    }    
        
    componentDidMount() {
        const {id, data, options, moveTo, fit, focus, setProps} = this.props;    
        var gd = document.getElementById(id);
        var newOptions = options ;
        this.nn.add(data.nodes)
        this.ee.add(data.edges)
        if ('manipulation' in options && 'enabled' in options['manipulation'] &&
         options['manipulation']['enabled'] == true ) {
            if ('addNode' in options['manipulation']) {
                console.log(options['manipulation']['addNode'])
                newOptions['manipulation']['addNode'] = window[options['manipulation']['addNode']]
            }
            if ('addEdge' in options['manipulation']) {
                console.log(options['manipulation']['addEdge'])
                newOptions['manipulation']['addEdge'] = window[options['manipulation']['addEdge']]
            }
            if ('editNode' in options['manipulation']) {
                console.log(options['manipulation']['editNode'])
                newOptions['manipulation']['editNode'] = window[options['manipulation']['editNode']]
            }
            if ('editEdge' in options['manipulation']) {
                var obj = options['manipulation']['editEdge'];
                console.log(options['manipulation']['editEdge']);
                if (typeof obj === 'string' || obj instanceof String) {
                  newOptions['manipulation']['editEdge'] = window[options['manipulation']['editEdge']];
                } else {
                   if (typeof obj === 'object' && 'editWithoutDrag' in obj) {
                     newOptions['manipulation']['editEdge']['editWithoutDrag'] =
                     window[options['manipulation']['editEdge']['editWithoutDrag']];
                   } else {
                     delete newOptions['manipulation']['editEdge'];
                   }
                }
            }
            console.log('newOptions')
            console.log(newOptions)
         }
        this.net = new vis.Network(gd, {nodes: this.nn, edges: this.ee}, newOptions)
        this.net.addEventListener('select', function(x){ 
            if (setProps) setProps({selection:{'nodes':x.nodes, 'edges':x.edges}})
        })
        if (moveTo.Is_used != false) this.net.moveTo( moveTo ) 
        if (fit.Is_used != false) this.net.fit( fit ) 
        if (focus.Is_used != false) this.net.focus( focus.nodeId, focus.options) 
    }
    
    componentWillReceiveProps(nextProps) {    
        if (this.props.data !== nextProps.data){ 
            var new_id_nodes = nextProps.data.nodes.map(function(x) {return x.id })
            var remove_aim_nodes = this.nn.getIds().filter(function(x){ return new_id_nodes.indexOf(x) == -1 })
            this.nn.remove(remove_aim_nodes)
            this.nn.update(nextProps.data.nodes) 
            
            var new_id_edges = nextProps.data.edges.map(function(x) {return x.id })
            var remove_aim_edges = this.ee.getIds().filter(function(x){ return new_id_edges.indexOf(x) == -1 })
            this.ee.remove(remove_aim_edges)
            this.ee.update(nextProps.data.edges)            
        }
        if (this.props.options !== nextProps.options){
            this.net.setOptions( nextProps.options )
        } 
        if (this.props.moveTo !== nextProps.moveTo & nextProps.moveTo.Is_used != false){
            this.net.moveTo( nextProps.moveTo )
        }
        if (this.props.fit !== nextProps.fit & nextProps.fit.Is_used != false){
            this.net.fit( nextProps.fit )
        }  
        if (this.props.focus !== nextProps.focus & nextProps.focus.Is_used != false){
            this.net.focus( nextProps.focus.nodeId, nextProps.focus.options)
        }        
    }
    
    shouldComponentUpdate(nextProps){
            return (this.props.data !== nextProps.data || this.props.options !== nextProps.options);
    }
    
    render() {
        const {id, style} = this.props;              
        return (
            <div id = {id} style = {style}></div>
        );
    }
}

Network.propTypes = {
    id : PropTypes.string.isRequired,
    data : PropTypes.object,   
    options : PropTypes.object,
    style: PropTypes.object,
    selection: PropTypes.object,
    moveTo: PropTypes.object,
    fit: PropTypes.object,
    focus: PropTypes.object
};
        
Network.defaultProps = {
    data :{nodes:[{id: 1, label: 'Node 1'},
                  {id: 2, label: 'Node 2'},
                  {id: 3, label: 'Node 3'},
                  {id: 4, label: 'Node 4'},
                  {id: 5, label: 'Node 5'} ],
           edges :[{from: 1, to: 3},
                   {from: 1, to: 2},
                   {from: 2, to: 4},
                   {from: 2, to: 5} ]          },
    options : {},
    moveTo : {Is_used: false},
    fit: {Is_used: false},
    focus: {Is_used: false}               
}        

         

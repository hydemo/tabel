import React from 'react';
import cookies from 'js-cookie';
import config from 'Config';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { LocaleProvider, DatePicker, message } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { Row, Col, Input, Button, Select } from 'antd';
import { Table, Icon, Divider } from 'antd';
import styles from './index.css';
const Option = Select.Option;
const Search = Input.Search;
//表头数据

const HOST = 'http://47.96.20.193:8000/api';
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		titleList:[],
    list: [],
    filterDropdownVisible: false,
    searchText: '',
    filtered: false,
    defaultCurrent:15,
    current:'',
		pageSize:3,
		scenarioId:'5aa220a1f5ff4657e417af87',
		total:[],
		taskType:[],
    };
  }
  

  componentWillMount() {
		const token = cookies.get('token');
    if (!token) {
      // const {
      //   CLIENT_ID,
      //   OAUTh_URL,
      // } = config;
      // const { location } = window;
      // const to = `${location.origin}/login`;
      // location.href =`http://salesdemo.teambition.net/oauth2/authorize?client_id=42096170-f743-11e7-b297-3d5e40c4d20d&redirect_uri=http:127.0.0.1:8080/login`;
			// location.href =`http://127.0.0.1:8080`;
			
    }
  }

  componentDidMount(){	
		const {
			current,
			pageSize,
			searchText,
			scenarioId,
			total,
			taskType,
		} = this.state;	
		//总数据地址
		const totalUrl = `/task?scenarioId=${scenarioId}`
		// 标题数据地址
		const titleUrl = `/title?scenarioId=${scenarioId}`;
		// 表体数据地址
		const listtask = `/task?scenarioId=${scenarioId}&current=${current}&pageSize=${pageSize}&value=${searchText}`;
		// 任务类型地址
		const taskTypeUrl = `/scenario?project=5aa1e8c33041154ac6f49df8`;

		this.getData(taskTypeUrl)
			.then(data => {
				const list = [];
				const scenarioId = [];
				data.map((item,index) => {
					console.log(item._id)
					list.push(item);
					scenarioId.push(item._id);
					this.setState({	
						taskType:list,
					})
				})
				this.setState({
					scenarioId:scenarioId[0],
				})
				// console.log(scenarioId[0])
			})

		this.getData(totalUrl)
			.then(data => {
				const list = [];
				data[0].map(item => {
					list.push(item.customfields);
				})
				this.setState({	
					total:list
				 })
			})

		this.getData(titleUrl)
			.then(data => {
				// console.log('data', data);
				const titleList = [];
				const { titleFields } = data;
				for(let key in titleFields ) {
					titleList.push({
						title: titleFields[key],
						dataIndex: key
					})
				}
				this.setState({	titleList })
			})

		this.getData(listtask)
			.then(data => {
				// console.log('listtask', data);
				const list = [];
				data[0].map(item => {
					// console.log(item);
					list.push(item.customfields);
				})
				this.setState({	
					list,
					total:list,
				 })
			})

			
			
	}

		
	getData = (url) => 
		fetch(`${HOST}${url}`)
		  .then(res => res.json())
		  .then(data => data);

  //输入框搜索
  onInputChange = (e) => {
		console.log(e.target.value)
		const {
			current,
			pageSize,
			searchText,
			scenarioId,
			total,
		} = this.state;
		const inputChangeUrl = `/task?scenarioId=${scenarioId}&current=${current}&pageSize=${pageSize}&value=${e.target.value}`;
		this.getData(inputChangeUrl)
		.then(data => {
			const list = [];
			data[0].map(item => list.push(item.customfields))
			this.setState({	
				list,
				total:list,
			 })
		})
		this.setState({	
			searchText:e.target.value,
		})
	}
	
  onSearch = () => {
    const { searchText } = this.state;
    const reg = new RegExp(searchText, 'gi');
	}

	//表格页码改变
	pageChange = (page) => {
		console.log(page);
		const { 
			current,
			pageSize,
			searchText,
			scenarioId,
		 } = this.state;
		const listtask = `/task?scenarioId=${scenarioId}&current=${page}&pageSize=${pageSize}&value=${searchText}`;
		this.getData(listtask)
			.then(data => {
				console.log('listtask', data);
				const list = [];
				data[0].map(item => list.push(item.customfields))
				this.setState({	
					list,
					current:page,
				 })
			})
	}

	// 任务类型切换
	taskChange = (value) => {
		// console.log(`selected ${value}`);
		const {
			current,
			pageSize,
			searchText,
			scenarioId,
		}  = this.state;
		this.setState({
			scenarioId:value,
		})
		const totalUrl = `/task?scenarioId=${value}`;
		const titleUrl = `/title?scenarioId=${value}`;
		const listtask = `/task?scenarioId=${value}&current=${current}&pageSize=${pageSize}&searchText=${searchText}`;

		this.getData(totalUrl)
			.then(data => {
				const list = [];
				data[0].map(item => {
					list.push(item.customfields);
				})
				this.setState({	
					total:list
				 })
			})

		this.getData(titleUrl)
			.then(data => {
				// console.log('data', data);
				const titleList = [];
				const { titleFields } = data;
				for(let key in titleFields ) {
					titleList.push({
						title: titleFields[key],
						dataIndex: key
					})
				}
				this.setState({	titleList })
			})

		this.getData(listtask)
			.then(data => {
				console.log('listtask', data);
				const list = [];
				data[0].map(item => {
					item.key = item._id;
					list.push(item.customfields);
				})
				this.setState({	
					list,

				 })
			})
	}
	//点击下载表格
	click = () =>{
		const {
			scenarioId,
		} = this.state;
		const downloadUrl = `${HOST}/xlsx?scenarioId=${scenarioId}`
		// this.getData(downloadUrl)
		location.href =`${downloadUrl}`;
	}

  render() {
		const {
			list,
			titleList,
			searchText,
			scenarioId,
			taskType
		} = this.state;
    return (
      <div className = {styles.content}>
      	<Row style={{height:'5%',marginBottom:'5px',marginTop:'5px'}}>
	      <Col span={4}></Col>
	      <Col span={18}>
	      	<Row>
	      		<div className={styles.tit}><Col span={4}>FOTILE 方太</Col></div>
	      		<Col span={14}></Col>
	      		<Col span={6}>
	      			<div className="search">
	      				<Search 
					      placeholder="输入姓名进行搜索"
					      onSearch={value => console.log(value)}
					      style={{ width: 290,
					      borderRadius: "10%"  }}
				        value={this.state.searchText}
				        onChange={this.onInputChange}
				        onPressEnter={this.onSearch}
					    />
	      			</div>
	      			
	      		</Col>
	      	</Row>
	      </Col>
	      <Col span={2}></Col>
	    </Row>
	    <Row style={{ backgroundColor: '#eee' }} className={styles.header}>
	      <Col span={4}></Col>
	      <Col span={18}>
	      	<Row>
	      		<Col span={4}>安装排班表</Col>
	      		<Col span={16}>
							
							
	      		</Col>
	      		<Col span={4}>
							<div  className={styles.download}>
								<Button type="primary" size={'small'} icon="download" onClick = {this.click.bind(this)} >导出排班表(*.excel)</Button>	
							</div>
	      		</Col>
	      	</Row>
	      </Col>
	      <Col span={2}></Col>
	    </Row>
	    <Row style={{ backgroundColor: '#eee' }}>
	      <Col span={4} >
				<div className={styles.type}>
					<Select defaultValue="排班表" style={{ width: 120 }} onChange={this.taskChange.bind(this)}>
						{
							taskType.map(i => <Option key={i._id} value={i._id}>{i.name}</Option>)
						}
					</Select>
				</div>
				</Col>
	      <Col span={18} className='table'>
          <Table
           pagination ={{
            current:this.state.current,
            pageSize:this.state.pageSize,
            total:this.state.total.length,
            hideOnSinglePage:true,
						onChange:this.pageChange.bind(this),
           }}
           size='default'
	      	 style={{ backgroundColor: 'white' }} 
					 columns={titleList} 
	      	 dataSource={list}  />
	      </Col>
	      <Col span={2} style={{ backgroundColor: '#eee' }}></Col>
	    </Row>
      <Row style={{ backgroundColor: '#eee',height:'80%' }}>
        <Col span={24}>
            
        </Col>
      </Row>
      </div>
    );
  }
  
}

export default Index;

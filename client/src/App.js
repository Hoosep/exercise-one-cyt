import React, { Component, Fragment } from 'react';
import { Form, Row, Col, Icon, Button, message, InputNumber } from 'antd';
import { SorterNumbers } from './services';

let id = 0;

class App extends Component {
  state = {
    data: '',
    responseOK: false,
  }
  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }

    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length >= 6){
      message.warning('You just need to add six numbers.');
      return;
    }
    
    const nextKeys = keys.concat(id++);
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length < 6) {
      message.warning('You must add six random numbers.');
    } else {
      form.validateFields((err, values) => {
        if (!err) {
          const { names:numbers } = values;
  
          return SorterNumbers(numbers)
          .then( data => {
            this.setState({
              data: data,
              responseOK: true
            })
          });
        }
      });
    }
  };

  render() {
    const { data, responseOK } = this.state;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    
    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 12, offset: 6 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <Form.Item
        {...(formItemLayout)}
        required={false}
        key={k}
      >
        {getFieldDecorator(`names[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "Add a number, please.",
            },
          ],
        })(<InputNumber  placeholder={`Number ${index + 1}`} style={{ width: '95%', marginRight: 8 }} />)}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));
    return (
      <Fragment>
        <Row type="flex" justify="center" align="middle">
          <Col span={24}>
            <h1 className="text-center">Add six random numbers.</h1>
          </Col>
          <Col span={24}>
            <Form onSubmit={this.handleSubmit}>
              {formItems}
              <Form.Item {...formItemLayout}>
                <Button block type="dashed" onClick={this.add} >
                  <Icon type="plus" /> Add number.
                </Button>
              </Form.Item>
              <Form.Item {...formItemLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        {
          responseOK
          ? <Row type="flex" justify="center" align="middle">
              <Col span={24} className="text-center">
                <h3>Yours numbers.</h3>
              </Col>
              <Col span={24} className="text-center">
                <strong>Numbers ASC:</strong> {data.numberSorterAsc}
              </Col>
              <Col span={24} className="text-center">
                <strong>Numbers DESC:</strong> {data.numberSorterDesc}
              </Col>
            </Row>
          : null
        }
      </Fragment>
    );
  }
}

const WrappedApp = Form.create({ name: 'dynamic_form_item' })(App);

export default WrappedApp;
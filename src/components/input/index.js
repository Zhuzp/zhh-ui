import React, { Component } from 'react';
import "./index.scss";
import showIconDefault from "@assets/eye.png";
import closeIconDefault from "@assets/close-eye.png";

// 保存光标位置
let selectionStart = 0,
  selectionEnd = 0;

export default class EncryptedInput extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      show: this.props.mode === "plain" ? 1 : 0,
      value: "",
      mValue: "",
    };
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    if (this.props.initValue) {
      this.setState(
        {
          value: this.props.initValue,
          mValue: this.handleFormat(this.props.initValue),
        },
        () => {
          if (this.state.show) {
            this.inputRef.current.value = this.state.value;
          } else {
            this.inputRef.current.value = this.state.mValue;
          }
        }
      );
    }
  };

  // 脱敏处理
  handleFormat = (value) => {
    const { front = 0, end = 0 } = this.props;
    if (!value) {
      this.setState({
        mValue: "",
      });
      return "";
    }
    let str = "";
    const len = value.length;
    const star = Math.max(0, len - (Number(front) + Number(end)));
    if (len <= Number(front) + Number(end)) {
      str = value;
    } else {
      str =
        value.slice(0, Number(front)) +
        "*".repeat(star) +
        value.slice(Number(front) + star);
    }
    ``;
    this.setState({
      mValue: str,
    });
    return str;
  };

  handleChange = (e) => {
    if (this.inputRef.current.cnIputFlag) return;
    // 获取光标
    selectionStart = e.target.selectionStart;
    selectionEnd = e.target.selectionEnd;
    // 光标位置
    const ind = selectionStart - 1;
    let actualVal = this.state.value || "";
    let currentVal = e.target.value;
    const isAdd = currentVal.length > actualVal.length;
    const num = Math.abs(currentVal.length - actualVal.length);
    if (isAdd) {
      actualVal =
        actualVal.slice(0, ind - num + 1) +
        currentVal.slice(ind - num + 1, ind + 1) +
        actualVal.slice(ind - num + 1);
    } else {
      actualVal = actualVal.slice(0, ind + 1) + actualVal.slice(ind + num + 1);
    }
    this.setState(
      {
        value: actualVal,
      },
      () => {
        const value = this.state.value,
          mValue = this.handleFormat(this.state.value);
        if (this.state.show) {
          this.inputRef.current.value = value;
        } else {
          this.inputRef.current.value = mValue;
        }
        if (this.inputRef.current) {
          this.inputRef.current.setSelectionRange(selectionStart, selectionEnd);
        }
        if (this.props.onChange) {
          this.props.onChange(value, mValue);
        }
      }
    );
  };
  handleSetValue() {
    if (this.inputRef.current) {
      if (this.state.show) {
        this.inputRef.current.value = this.state.value;
      } else {
        this.inputRef.current.value = this.state.mValue;
      }
    }
  }
  // 主要为了校验是否在进行中文输入
  composition = (e) => {
    if (e.type === "compositionend") {
      this.inputRef.current.cnIputFlag = false;
      this.handleChange(e);
    } else {
      this.inputRef.current.cnIputFlag = true;
    }
  };

  changeIcon = () => {
    this.setState(
      {
        show: this.state.show ^ 1,
      },
      () => {
        if (this.state.show) {
          this.inputRef.current.value = this.state.value;
        } else {
          this.inputRef.current.value = this.handleFormat(this.state.value);
        }
      }
    );
  };

  render() {
    const {
      style,
      showIcon = showIconDefault,
      closeIcon = closeIconDefault,
    } = this.props;
    const { show } = this.state;
    return (
      <div className="react-encrypted-input-wrap">
        <input
          ref={this.inputRef}
          style={style?.input || {}}
          onChange={(e) => this.handleChange(e)}
          onCompositionStart={this.composition}
          onCompositionEnd={this.composition}
        />
        <img
          className="icon"
          src={show ? showIcon : closeIcon}
          onClick={this.changeIcon}
          style={style?.icon || {}}
        />
      </div>
    );
  }
}


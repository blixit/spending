```jsx
const style = {
  flexDirection: 'column'
};

const props = {
  placeholder: 'Type your text'
};

<ExampleFlexWrap style={style}>
  <Input {...props} />
  <Input {...props} onChange={e => alert('changed')} />
</ExampleFlexWrap>
```
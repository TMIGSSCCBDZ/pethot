import React, { useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {useStateValue} from '../backend/StateProvider'
import store from 'store-js'
export default function RadioButtonsGroup() {
    const user = store.get('user')?.user
    const [basket,dispatch] = useStateValue()
    const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
store.set('color',{color:value})
  }
  const color= store.get('user')?.user
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Color</FormLabel>
      <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        <FormControlLabel value="primary" control={<Radio  />} label="Red"  />
        <FormControlLabel value="secondary" control={<Radio  />} label="Blue" />
      </RadioGroup>
    </FormControl>
  );
}

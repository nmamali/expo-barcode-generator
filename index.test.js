import { render } from '@testing-library/react-native';
import { screen } from '@testing-library/react-native';
import {Barcode} from "./index";

describe('When using "ExpoBarcodeGenerator"', ()=>{{
    it('test',()=>{
        render(<Barcode value={'123'}/>);
        expect(screen.toJSON().toMatchSnapshot())
    })
}})
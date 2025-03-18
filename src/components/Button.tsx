import {Button} from 'react-native';

type ButtonProps = {
    title: string
}

export const CustomButton = ({title}: ButtonProps) => {
    return(
        <Button color='#112249' title={title}/>
    )
}

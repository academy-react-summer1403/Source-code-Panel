// ** Icons Imports
import { Award } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardBody, CardText } from 'reactstrap'

// ** Images
import decorationLeft from '@src/assets/images/elements/decore-left.png'
import decorationRight from '@src/assets/images/elements/decore-right.png'

const CardCongratulations = () => {
    return (
        <Card className='card-congratulations'>
            <CardBody className='text-center'>
                <img className='congratulations-img-left' src={decorationLeft} alt='decor-left' />
                <img className='congratulations-img-right' src={decorationRight} alt='decor-right' />
                <Avatar icon={<Award size={20} />} className='shadow' color='primary' />
                <div className='text-center'>
                    <h1 className='text-white'>تبریک!</h1>
                    <CardText className='m-auto w-75'>
                        مبلغ تمام دوره های تیم 100 تومان است
                    </CardText>
                </div>
            </CardBody>
        </Card>
    )
}

export default CardCongratulations
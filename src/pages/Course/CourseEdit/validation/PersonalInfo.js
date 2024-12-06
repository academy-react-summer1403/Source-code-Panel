// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

const defaultValues = {
    lastName: '',
    firstName: ''
}

const PersonalInfo = ({ stepper }) => {
    // ** Hooks
    const {
        control,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues })

    const onSubmit = data => {
        if (Object.values(data).every(field => field.length > 0)) {
            stepper.next()
        } else {
            for (const key in data) {
                if (data[key].length === 0) {
                    setError(key, {
                        type: 'manual',
                        message: `Please enter a valid ${key}`
                    })
                }
            }
        }
    }

    const Options = [
        { value: 'حضوری', label: 'حضوری' },
        { value: 'غیرحضوری', label: 'غیرحضوری' },

    ]
    const classOptions = [
        { value: 'classRom2', label: 'classRom2' },
        { value: 'classRom1', label: 'classRom1' },

    ]
    const languageOptions = [
        { value: 'English', label: 'English' },
        { value: 'French', label: 'French' },
        { value: 'Spanish', label: 'Spanish' },
        { value: 'Italian', label: 'Italian' },
        { value: 'Japanese', label: 'Japanese' }
    ]

    return (
        <Fragment>
            <div className='content-header'>
                <h5 className='mb-0'> ویژگی دوره را وارد کنید</h5>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col md='6' className='mb-1'>
                        <Label className='form-label' for='firstName'>
                            نحوه برگزاری
                        </Label>
                        <Select
                            theme={selectThemeColors}
                            isClearable={false}
                            id={`firstName`}
                            className='react-select'
                            classNamePrefix='select'
                            options={Options}

                        />
                    </Col>
                    <Col md='6' className='mb-1'>
                        <Label className='form-label' for='class'>
                            نام کلاس
                        </Label>
                        <Select
                            theme={selectThemeColors}
                            isClearable={false}
                            id={`class`}
                            className='react-select'
                            classNamePrefix='select'
                            options={classOptions}

                        />
                    </Col>
                </Row>
                <Row>
                    <Col md='6' className='mb-1'>
                        <Label className='form-label' for='term'>
                            ترم دوره
                        </Label>
                        <Select
                            theme={selectThemeColors}
                            isClearable={false}
                            id={`term`}
                            className='react-select'
                            classNamePrefix='select'
                        // options={termOptions}

                        />
                    </Col>
                    <Col md='6' className='mb-1'>
                        <Label className='form-label' for='level'>
                            سطح برگزاری
                        </Label>
                        <Select
                            theme={selectThemeColors}
                            isClearable={false}
                            id={`level`}
                            className='react-select'
                            classNamePrefix='select'
                        // options={termOptions}

                        />
                    </Col>
                    <Col md='6' className='mb-1'>
                        <Label className='form-label' for='teacher'>
                            انتخاب معلم
                        </Label>
                        <Select
                            theme={selectThemeColors}
                            isClearable={false}
                            id={`teacher`}
                            className='react-select'
                            classNamePrefix='select'
                        // options={termOptions}

                        />
                    </Col>
                </Row>
                <div className='d-flex justify-content-between'>
                    <Button type='button' color='primary' className='btn-prev' onClick={() => stepper.previous()}>
                        <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                        <span className='align-middle d-sm-inline-block d-none'>Previous</span>
                    </Button>
                    <Button type='submit' color='primary' className='btn-next'>
                        <span className='align-middle d-sm-inline-block d-none'>Next</span>
                        <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
                    </Button>
                </div>
            </Form>
        </Fragment>
    )
}

export default PersonalInfo
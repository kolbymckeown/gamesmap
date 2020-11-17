import React from 'react'
import styled from 'styled-components'

const ImageUpload = () => {
	return (
		<Wrapper>
			<Form>
				<Label htmlFor="photo_file">Upload Screenshot</Label>
				<Input type="file" name="photo_file" id="photo_file" />
				<Input type="submit" />
			</Form>
		</Wrapper>
	)
}

export default ImageUpload;

const Wrapper = styled.div``;

const Form = styled.form``;

const Input = styled.input``;

const Label = styled.label``;
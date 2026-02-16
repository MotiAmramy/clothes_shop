import React from 'react';
import styled from 'styled-components';
import Button from '../../ui/Button/Button';

const Overlay = styled.div<{ isOpen: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const Content = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 8px;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
`;

const Title = styled.h3`
    margin-top: 0;
    color: #333;
`;

const Message = styled.p`
    color: #666;
    margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
`;

interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
}) => {
    if (!isOpen) return null;

    return (
        <Overlay isOpen={isOpen} onClick={onCancel}>
            <Content onClick={(e) => e.stopPropagation()}>
                <Title>{title}</Title>
                <Message>{message}</Message>
                <ButtonGroup>
                    <Button onClick={onCancel} style={{ background: '#ccc', color: '#333' }}>
                        Cancel
                    </Button>
                    <Button onClick={onConfirm} style={{ background: '#dc3545', color: 'white' }}>
                        Confirm
                    </Button>
                </ButtonGroup>
            </Content>
        </Overlay>
    );
};

export default ConfirmationModal;

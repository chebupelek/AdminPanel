import { Button, Col, Row, Card, Select, Pagination } from "antd";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRolesFullThunkCreator } from "../../Reducers/RolesReducer";
import { useNavigate } from "react-router-dom";
import RoleCard from "./rolesCard";

function Roles() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const roles = useSelector(state => state.roles.roles) || [];

    useEffect(() => {
        dispatch(getRolesFullThunkCreator(navigate));
    }, [dispatch]);

    return (
        <div style={{ width: '75%', paddingBottom: '50px' }}>
            <Row align="middle">
                <h1>Системные роли</h1>
            </Row>
            <Row gutter={16} style={{ marginTop: '2%' }}>
                {roles.map(role => (
                    <Col key={role.id} span={24}>
                        <RoleCard
                            id={role.id}
                            name={role.name}
                            type={role.type}
                            childRoles={role.childRoles}
                            navigate={navigate}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default Roles;
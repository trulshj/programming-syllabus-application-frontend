import React from 'react';
import { render, screen } from '@testing-library/react';
import ArticleList from './ArticlesList';

test('Simple verification of successful render of ArticleList', () => {
    expect(render(<ArticleList match={{params:{id:1}}} />)).toBeDefined()
});

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { Renderer, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { useInvestigateInTimeline, UseInvestigateInTimelineValue } from '.';
import { generateMockIndicator, generateMockUrlIndicator, Indicator } from '../../indicators';
import { TestProvidersComponent } from '../../../common/mocks/test_providers';

describe('useInvestigateInTimeline()', () => {
  let hookResult: RenderHookResult<{}, UseInvestigateInTimelineValue, Renderer<unknown>>;

  it('should return empty object if Indicator is incorrect', () => {
    const indicator: Indicator = generateMockIndicator();
    indicator.fields['threat.indicator.name'] = ['wrong'];

    hookResult = renderHook(() => useInvestigateInTimeline({ indicator }), {
      wrapper: TestProvidersComponent,
    });
    expect(hookResult.result.current).toEqual({});
  });

  it('should return investigateInTimelineFn', () => {
    const indicator: Indicator = generateMockUrlIndicator();

    hookResult = renderHook(() => useInvestigateInTimeline({ indicator }), {
      wrapper: TestProvidersComponent,
    });

    expect(hookResult.result.current).toHaveProperty('investigateInTimelineFn');
  });
});

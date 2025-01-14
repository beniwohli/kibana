/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { EuiButton, EuiButtonIcon } from '@elastic/eui';
import type { FunctionComponent } from 'react';
import React from 'react';
import { useBehaviorSubject } from '../../use_behavior_subject';
import { useUploadState } from '../context';
import { i18nTexts } from '../i18n_texts';

interface Props {
  compressed?: boolean;
  onClick: () => void;
}

export const CancelButton: FunctionComponent<Props> = ({ onClick, compressed }) => {
  const uploadState = useUploadState();
  const uploading = useBehaviorSubject(uploadState.uploading$);
  const disabled = !uploading;
  return compressed ? (
    <EuiButtonIcon
      color="danger"
      data-test-subj="cancelButtonIcon"
      disabled={disabled}
      iconType="cross"
      aria-label={i18nTexts.cancel}
      onClick={onClick}
    />
  ) : (
    <EuiButton
      key="cancelButton"
      size="s"
      data-test-subj="cancelButton"
      disabled={disabled}
      onClick={onClick}
      color="danger"
    >
      {i18nTexts.cancel}
    </EuiButton>
  );
};

To ensure all LogGroups have retention set between dev and prod

```yaml
Parameters:
  LogGroupRetentionInDays:
    Type: Number
    Default: 7
    Description: Retention period for CloudWatch Logs in days

Resources:
    Function:
        Type: AWS::Serverless::Function
        Properties:
            CodeUri: src/presigned-url
            ...
    FunctionLogGroup:
        Type: AWS::Logs::LogGroup
        UpdateReplacePolicy: Delete
        DeletionPolicy: Delete
        Properties:
            LogGroupName: !Sub /aws/lambda/${Function}
            RetentionInDays: !Ref LogGroupRetentionInDays
```
class Ability
  include CanCan::Ability

  def initialize(user)
    can :read, :all # users can see every entity in the app

    # requests permissions
    can :create, Request
    can [:update, :destroy], Request, user_id: user.id

    # proposals permissions
    can :create, Proposal do |proposal|
      proposal.request.user != user
    end

    can :destroy, Proposal, user_id: user

    can :accept, Proposal do |proposal|
      proposal.user != user && proposal.request.user == user
    end
  end
end
